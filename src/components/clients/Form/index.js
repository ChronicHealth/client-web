// @flow
import * as React from 'react';
import TextInput from 'ui-kit/TextInput';
import SelectScope from '../../scopes/Select';

type $props = Object;
export default class ClientForm extends React.PureComponent<$props> {
  render() {
    const { fields, ...props } = this.props;
    return (
      <React.Fragment>
        <TextInput {...fields.name} />
        <TextInput multiline rows={3} {...fields.general} />
        <SelectScope {...fields.scopes} />
      </React.Fragment>
    );
  }
}
