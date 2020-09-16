/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { Page } from '~/application/modules/pages/Page';
import { computed, extendObservable, observable, reaction, toJS } from 'mobx';
import { CrudlApi } from './items/CrudlApi';
import { CrudlRenderer } from './items/CrudlRenderer';
import {
  CrudlActionEnum,
  CrudlEntityOptions,
} from '~/application/modules/pages/CrudlEntity/types';
import { Provider } from 'mobx-react';
import { CRUDL_DEFAULT_FEATURES } from '~/application/modules/pages/CrudlEntity/defaults';
import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';
import { CrudlData } from '~/application/modules/pages/CrudlEntity/items/CrudlData';
import { CrudlController } from '~/application/modules/pages/CrudlEntity/items/CrudlController';
import { CrudlFilters } from '~/application/modules/pages/CrudlEntity/items/CrudlFilters';
import { CrudlEntityReferenceProps } from '~/application/modules/pages/CrudlEntity/types/reference';

export class CrudlEntity<
  Fields extends Record<string, any> = Record<string, any>
> extends Page {
  constructor(
    public title: string,
    public url: string,
    public api: CrudlApi<Fields>,

    options: Partial<CrudlEntityOptions<Fields>> = {}
  ) {
    super({
      title,
      roles: options?.roles,
      menu: {
        enabled: options?.menu?.enabled || true,
        label: options?.menu?.label || title,
        url,
      },
    });

    extendObservable(this, { api, title, url });

    if (options.fields) this.fieldsList = options.fields;
    if (options.features) this.features = options.features;
    if (options.references) this.references = options.references;
    if (options.rows) this.filters.rows = options.rows;

    // Initialize renderer
    this.renderer =
      options.renderer ||
      new CrudlRenderer({
        list: options.list,
        // TODO: read options
        // TODO: create options,
        // TODO: update options
      });

    // Initialize ref fields storage
    this.data.createReferenceData(this.references);

    // Get filters from url
    this.filters.restoreFilters();

    // Update withToken for api
    reaction(
      () => this.parent?.auth?.withToken,
      () => this.api.useEntity(this)
    );

    // React on changes of mode
    reaction(() => this.mode, this.controller.onActionChange);

    // React on changes of list props
    reaction(
      () => [
        this.filters.sortBy,
        this.filters.sortDir,
        this.filters.page,
        this.filters.rows,
        this.filters.value,
      ],
      () => {
        this.filters.persistFilters();
        this.controller.loadList();
      }
    );
  }

  @observable features: CrudlEntityOptions['features'] = CRUDL_DEFAULT_FEATURES;
  @observable references: Record<string, CrudlEntityReferenceProps> = {};

  @observable renderer: CrudlRenderer = new CrudlRenderer();
  @observable data: CrudlData = new CrudlData();
  @observable mode?: CrudlActionEnum;
  @observable fieldsList: CrudlField<Fields>[] = [];
  @observable filters = new CrudlFilters(this);
  @observable controller = new CrudlController<Fields>(this);

  @computed
  get fields() {
    return this.fieldsList.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field,
      }),
      {} as Record<keyof Fields, CrudlField<Fields>>
    );
  }

  @computed
  get fieldsOrder() {
    return this.fieldsList.map((field) => field.name);
  }

  @computed
  get output() {
    return () => <Provider entity={this}>{this.renderer.output}</Provider>;
  }
}
