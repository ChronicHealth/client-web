// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';
import { Button } from 'ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { create as createTest, goToTest } from '@client/actions/tests';
import uuid from 'uuid/v1';
import TestForm from '../Form';
import { validationSchema } from '../../../@client/utils/tests';

type $props = Object;

export class CreateTest extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>Create Test</h1>
        <TestForm fields={this.props.fields} />
        <Button
          primary
          disabled={!props.isValid}
          onClick={this.props.handleSubmit}
        >
          Create
        </Button>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      createTest,
      goToTest
    },
    dispatch
  );

export default flowRight([
  connect(null, mapDispatchToProps),
  form({
    mapPropsToValues: () => ({
      name: '',
      notes: '',
      bodyLevels: [],
      refs: []
    }),
    validationSchema,
    handleSubmit: (values, { props }) => {
      const id = uuid();
      props.goToTest(id);
      return props.createTest({ ...values, id });
    }
  })
])(CreateTest);
