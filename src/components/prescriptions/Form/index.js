// @flow
import * as React from 'react';
import { flowRight } from 'lodash';
import { TextInput, MultiDropdown } from 'ui-kit';

type $props = Object;

export class PrescriptionForm extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <React.Fragment>
        <TextInput {...props.fields.name} />
        <MultiDropdown {...props.fields.purpose} source={[]} />
        <TextInput rows={3} multiline {...props.fields.notes} />
        <TextInput rows={3} multiline {...props.fields.instructives} />
        <TextInput rows={3} multiline {...props.fields.scope} />
        <MultiDropdown {...props.fields.refs} label="References" source={[]} />
      </React.Fragment>
    );
  }
}

export default flowRight()(PrescriptionForm);
