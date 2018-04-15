// @flow
import * as React from 'react';
import Async from 'react-select/lib/Async';
import AsyncCreatable from 'react-select/lib/AsyncCreatable';
import Creatable from 'react-select/lib/Creatable';
import BaseSelect from 'react-select/lib/Select';
import classnames from 'classnames';
import 'react-select/dist/react-select.css';
import styles from './style.pcss';
import './style.css';

type $props = {
  create: Boolean,
  className?: string,
  renderValues: (values: Array<any>) => any,
  onChange?: (values: Array<any>) => any,
  onAdd?: (value: any) => any,
  loadOptions: (input: string) => Promise<Array<Object>>,
  value: Array<any>,
  error: string,
  label: string,
  source?: Array<any>,
  sync?: boolean
};

export default class SelectDropdown extends React.Component<$props> {
  onChange = (option: Object) => {
    if (this.props.onChange)
      this.props.onChange((this.props.value || []).concat([option.id]));
    if (this.props.onAdd) this.props.onAdd(option.id);
  };
  loadOptions = (input: string) => {
    return this.props.loadOptions(input).then(options => {
      return {
        options
      };
    });
  };
  render() {
    const {
      create,
      renderValues,
      value,
      error,
      label,
      sync,
      className,
      ...props
    } = this.props;
    const Select = sync
      ? create ? Creatable : BaseSelect
      : create ? AsyncCreatable : Async;
    return (
      <div>
        <Select
          placeholder={label}
          className={classnames('customReactSelect-a2z7', className)}
          valueKey="id"
          labelKey="name"
          {...props}
          onChange={this.onChange}
          loadOptions={this.loadOptions}
        />
        {renderValues && renderValues(value)}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  }
}
