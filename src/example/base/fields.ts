import { FeatureField } from '~/application/modules/pages/Feature/items/FeatureField';
import { IFields } from '~/example/base/index';
import { DateField } from '~/application/modules/pages/Feature/components/fields/DateField';
import { IntegerField } from '~/application/modules/pages/Feature/components/fields/IntegerField';
import { SelectField } from '~/application/modules/pages/Feature/components/fields/SelectField';
import { ReferenceField } from '~/application/modules/pages/Feature/components/fields/ReferenceField';

export const BASE_FIELDS = [
  new FeatureField<IFields>('name', {
    label: 'Имя',
    features: {
      sort: true,
      filter: true,
    },
  }),
  new IntegerField<IFields>('age', {
    label: 'Возраст',
    accuracy: 2,
    features: {
      sort: true,
      filter: true,
    },
  }),
  new ReferenceField<IFields>('role', {
    label: 'Роль',
    features: {
      sort: true,
      filter: true,
    },
  }),
  new SelectField<IFields>('status', {
    label: 'Статус',
    options: {
      10: 'Активен',
      20: 'Неактивен',
      30: 'Заблокирован',
    },
    autocomplete: true,
    features: {
      sort: true,
      filter: true,
    },
  }),
  new DateField<IFields>('birthDate', {
    label: 'Дата рождения',
    features: {
      sort: true,
      filter: true,
    },
  }),
  new FeatureField<IFields>('description', {
    label: 'Описание',
    features: {
      sort: true,
      filter: true,
    },
  }),
];
