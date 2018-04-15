// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';

import { Button } from 'ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { validationSchema } from '@client/utils/testResults';
import { create as createTestResult } from '@client/actions/testResults';
import uuid from 'uuid/v1';
import TestResultForm from '../Form';

type $ownProps = {};

type $stateProps = {};

type $dispatchProps = {
  createTestResult: Function,
  goToTestResult: Function
};

type $props = $stateProps & $dispatchProps & $ownProps & $$formProps;

export class CreateTestResult extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <TestResultForm fields={this.props.fields} />
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

export const mapDispatchToProps = (
  dispatch: $$dispatch
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      createTestResult
    },
    dispatch
  );

export default flowRight([
  connect(null, mapDispatchToProps),
  form({
    mapPropsToValues: () => ({
      amount: ''
    }),
    validationSchema,
    handleSubmit: (values, { props }) => {
      return props.createTestResult({
        ...values,
        date: props.date,
        clientId: props.clientId,
        bodyLevelId: props.bodyLevelId
      });
    }
  })
])(CreateTestResult);
