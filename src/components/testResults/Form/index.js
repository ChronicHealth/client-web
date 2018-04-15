// @flow
import * as React from 'react';
import { flowRight } from 'lodash';
import { TextInput } from 'ui-kit';

type $props = {
  fields: Object
};

export class TestResultForm extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <React.Fragment>
        <TextInput {...props.fields.amount} />
      </React.Fragment>
    );
  }
}

export default flowRight()(TestResultForm);
