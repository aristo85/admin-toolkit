/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Entity } from '~/application';
import { ADMIN_ROLE_EDITOR, ADMIN_ROLE_ADMIN } from '../roles';
import { fetchItemsFn, getItemsFn, updateItemsFn, createItemsFn } from '../api';

export const TYPE_OFFER = 10;
export const TYPE_NEWS = 20;

export default (host: string) =>
  new Entity({
    title: 'Акции/Новости',
    editable: true,
    viewable: true,
    roles: {
      all: [ADMIN_ROLE_ADMIN.toString(), ADMIN_ROLE_EDITOR.toString()],
    },
    api: {
      list: {
        url: `${host}/admin/v1/news`,
        method: 'get',
      },
      update: {
        url: `${host}/admin/v1/news`,
        method: 'put',
      },
      create: {
        url: `${host}/admin/v1/news`,
        method: 'post',
      },
      get: {
        url: `${host}/admin/v1/news`,
        method: 'get',
      },
    },
    menu: {
      enabled: true,
      label: 'Акции/Новости',
      url: '/news',
    },
    filters: {
      current: '',
      value: '',
    },
    fields: [
      {
        name: 'type',
        type: 'select',
        label: 'Тип',
        required: true,
        filterable: true,
        availableVariants: {
          [TYPE_OFFER]: 'Акция',
          [TYPE_NEWS]: 'Новость',
        },
      },
      {
        name: 'title',
        type: 'string',
        label: 'Заголовок',
        required: true,
        title: true,
        filterable: true,
      },
      {
        name: 'date',
        type: 'date',
        label: 'Дата публикации',
        sortable: true,
        hideInEdit: true,
      },
      {
        name: 'description',
        type: 'richtext',
        label: 'Описание',
        required: true,
        hideInList: true,
      },
      {
        name: 'img',
        type: 'base64image',
        label: 'Изображение',
        required: false,
        hideInList: true,
      },
      {
        name: 'visible',
        type: 'boolean',
        label: 'Видимость',
        sortable: true,
      },
    ],
    fetchItemsFn,
    getItemsFn,
    updateItemsFn,
    createItemsFn,
  });