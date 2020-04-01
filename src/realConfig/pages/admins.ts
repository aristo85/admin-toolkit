/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Entity } from '~/application';

import { fetchItemsFn, getItemsFn, updateItemsFn, createItemsFn } from '../api';

import {
  ADMIN_ROLE_ADMIN,
  ADMIN_ROLE_EDITOR,
  ADMIN_ROLE_MANAGER,
} from '../roles';

export const CUSTOMER_STATUS_ACTIVE = 10;
export const CUSTOMER_STATUS_BLOCKED = 20;

export default (host: string) =>
  new Entity({
    title: 'Администраторы',
    editable: true,
    viewable: true,
    roles: {
      all: [ADMIN_ROLE_ADMIN.toString()],
    },
    api: {
      list: {
        url: `${host}/admin/v1/user`,
        method: 'get',
      },
      update: {
        url: `${host}/admin/v1/user`,
        method: 'put',
      },
      create: {
        url: `${host}/admin/v1/user`,
        method: 'post',
      },
      get: {
        url: `${host}/admin/v1/user`,
        method: 'get',
      },
    },
    menu: {
      enabled: true,
      label: 'Администраторы',
      url: '/user',
    },
    fields: [
      {
        name: 'name',
        type: 'string',
        label: 'Ф.И.О.',
        required: true,
        title: true,
        filterable: true,
      },
      {
        name: 'status',
        type: 'select',
        label: 'Статус',
        sortable: true,
        filterable: true,
        hideInEdit: true,
        options: {
          [CUSTOMER_STATUS_ACTIVE]: 'Активен',
          [CUSTOMER_STATUS_BLOCKED]: 'Заблокирован',
        },
      },
      {
        name: 'phone',
        type: 'phone',
        label: 'Рабочий тел.',
        required: true,
        filterable: true,
      },
      {
        name: 'personalPhone',
        type: 'phone',
        label: 'Личный тел.',
        required: true,
        hideInList: true,
      },
      {
        name: 'role',
        type: 'select',
        label: 'Роль',
        sortable: true,
        required: true,
        filterable: true,
        options: {
          [ADMIN_ROLE_ADMIN]: 'Главный Администратор',
          [ADMIN_ROLE_EDITOR]: 'Редактор Контента',
          [ADMIN_ROLE_MANAGER]: 'Менеджер Заявок',
        },
      },
      {
        name: 'email',
        type: 'string',
        label: 'E-mail',
        required: true,
        hideInList: true,
      },
    ],
    fetchItemsFn,
    getItemsFn,
    updateItemsFn,
    createItemsFn,
  });
