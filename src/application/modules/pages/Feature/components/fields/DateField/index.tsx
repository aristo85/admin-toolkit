import React from 'react';
import { FeatureField } from '~/application/modules/pages/Feature/components/fields/FeatureField';
import { computed, observable } from 'mobx';
import { format, parseISO } from 'date-fns/esm';
import { DateFilter } from '~/application/modules/pages/Feature/components/renderers/filters/DateFilter';
import { DateInput } from '~/application/modules/pages/Feature/components/inputs/DateInput';
import { observer } from 'mobx-react';

export type DateFieldParser = (val: string) => Date;
export type DateFieldFormatter = (val: Date) => string;

export type DateFieldOptions<T> = FeatureField<T>['options'] & {
  parser?: DateFieldParser;
  formatter?: DateFieldFormatter;
  format?: string;
  filterExact?: boolean;
};

export class DateField<
  T extends Record<string, any> = Record<string, any>
> extends FeatureField<T> {
  constructor(
    name: FeatureField['name'],
    {
      parser,
      format: dateFormat,
      formatter,
      filterExact,
      ...options
    }: DateFieldOptions<T>
  ) {
    super(name, options);

    if (parser) this.parser = parser;
    if (dateFormat) this.dateFormat = dateFormat;
    if (formatter) this.formatter = formatter;
    if (filterExact) this.filterExact = filterExact;
  }

  @observable filterExact = false;
  @observable dateFormat = 'dd.MM.yyyy';
  @observable parser: DateFieldParser = (val: string) => parseISO(val);
  @observable formatter: DateFieldFormatter = (val: Date) => {
    return format(val, this.dateFormat);
  };

  formatValue(val: string): string {
    const date = this.parser(val);
    return this.formatter(date);
  }

  asString(val: string) {
    return this.formatValue(val);
  }

  List: FeatureField['List'] = ({ value }) => (
    <div>{(!!value && this.formatValue(value)) || ''}</div>
  );

  @computed
  get Update() {
    return (
      <DateInput
        value={this.readValue}
        label={this.label}
        onChange={this.onChange}
        error={this.editError}
      />
    );
  }

  @observable
  Filter: FeatureField['Filter'] = observer(() => (
    <DateFilter
      label={this.label}
      name={this.name}
      value={this.filterValue}
      onChange={this.onFilterChange}
      onReset={this.onFilterReset}
      isRange={!this.filterExact}
    />
  ));
}
