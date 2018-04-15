// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { update as updateTestResult } from '@client/actions/testResults';
import { validationSchema } from '@client/utils/testResults';
import TestResultForm from '../Form';
import type { $stateProps as $getTestResultProps } from '../get';

type $stateProps = {};
type $dispatchProps = {
  updateTestResult: Function
};
type $ownProps = $getTestResultProps;

type $props = $stateProps & $dispatchProps & $ownProps & $$formProps;

export class EditTestResult extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <TestResultForm fields={this.props.fields} />
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch, { id }: $ownProps) =>
  bindActionCreators(
    {
      updateTestResult: values => updateTestResult(id, values)
    },
    dispatch
  );

export default flowRight([
  connect(null, mapDispatchToProps),
  form({
    mapPropsToValues: ({ testResult }) => {
      return {
        amount: testResult.amount
      };
    },
    validationSchema,
    handleChange: ({ updateTestResult, date, clientId, bodyLevelId }) => {
      return (key, onChange) => {
        return value => {
          onChange(value);
          return updateTestResult({
            [key]: value,
            date,
            bodyLevelId,
            clientId
          });
        };
      };
    }
  })
])(EditTestResult);
