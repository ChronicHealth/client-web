// @flow
import * as React from 'react';
import Async from 'react-select/lib/Async';
import AsyncCreatable from 'react-select/lib/AsyncCreatable';
import 'react-select/dist/react-select.css';
import styles from './style.pcss';
import './style.css';

export default class SelectDropdown extends React.Component<Object> {
  onChange = (option: Object) => {
    return this.props.onChange(this.props.value.concat([option.id]));
  };
  loadOptions = (input: string) => {
    return this.props.loadOptions(input).then(options => {
      return {
        options
      };
    });
  };
  render() {
    const { create, renderValues, value, error, label, ...props } = this.props;
    const Select = create ? AsyncCreatable : Async;
    return (
      <div>
        <Select
          placeholder={label}
          className={'customReactSelect-a2z7'}
          valueKey="id"
          labelKey="name"
          {...props}
          onChange={this.onChange}
          loadOptions={this.loadOptions}
        />
        {renderValues(value)}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  }
}
