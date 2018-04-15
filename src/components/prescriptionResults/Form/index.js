// @flow
import * as React from 'react';
import { flowRight } from 'lodash';
import { TextInput, MultiDropdown } from 'ui-kit';

type $props = {
  fields: Object
};

export class PrescriptionResultForm extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <React.Fragment>
        <TextInput {...props.fields.name} />
        <TextInput rows={3} multiline {...props.fields.notes} />
        <TextInput rows={3} multiline {...props.fields.instructives} />
        <MultiDropdown {...props.fields.refs} label="References" source={[]} />
      </React.Fragment>
    );
  }
}

export default flowRight()(PrescriptionResultForm);
