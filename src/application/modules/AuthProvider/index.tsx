/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

// import React from 'react';
import { EMPTY_USER, IAuthProviderProps } from '~/application/types/auth';
import { computed, observable, action } from 'mobx';
import { flow } from 'mobx';
import { CancellablePromise } from 'mobx/lib/api/flow';

export class AuthProvider {
  // From props
  @observable user: IAuthProviderProps['user'] = EMPTY_USER;
  @observable authRequestFn: IAuthProviderProps['authRequestFn'];

  constructor(fields?: Partial<IAuthProviderProps>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }

  // Built-in
  @observable isLoading: boolean = false;
  @observable error: string = '';

  sendAuthRequestInstance?: CancellablePromise<any>;

  @action
  sendAuthRequest = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    this.sendAuthRequestCancel();

    this.sendAuthRequestInstance = flow(function* sendAuthRequest(
      this: AuthProvider
    ) {
      if (!this.authRequestFn) return;

      this.isLoading = true;

      try {
        const response = yield this.authRequestFn(email, password).catch(
          () => null
        );

        if (!response || response.error) {
          throw new Error(response.error);
        }

        this.user = response.user;
      } catch (e) {
        this.error = e;
      } finally {
        this.isLoading = false;
      }
    }).bind(this)();
  };

  sendAuthRequestCancel = () => {
    if (this.sendAuthRequestInstance && this.sendAuthRequestInstance.cancel) {
      this.sendAuthRequestInstance.cancel();
    }
  };

  @action
  logout = () => {
    this.user = EMPTY_USER;
  };

  @observable
  withToken = (req: any, args: any) => {
    return req({ ...args, token: this.user.token });
  };

  @computed
  get isLogged() {
    return !!this.user.token;
  }
}