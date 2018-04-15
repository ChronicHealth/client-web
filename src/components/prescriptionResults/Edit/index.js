// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { update as updatePrescriptionResult } from '@client/actions/prescriptionResults';
import { validationSchema } from '@client/utils/prescriptionResults';
import PrescriptionResultForm from '../Form';
import getPrescriptionResult from '../get';
import type { $stateProps as $getPrescriptionResultProps } from '../get';

type $stateProps = {};
type $dispatchProps = {
  updatePrescriptionResult: Function
};
type $ownProps = $getPrescriptionResultProps;

type $props = $stateProps & $dispatchProps & $ownProps & $$formProps;

export class EditPrescriptionResult extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>{props.prescriptionResult.name}</h1>
        <PrescriptionResultForm fields={this.props.fields} />
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch, { id }: $ownProps) =>
  bindActionCreators(
    {
      updatePrescriptionResult: values => updatePrescriptionResult(id, values)
    },
    dispatch
  );

export default flowRight([
  getPrescriptionResult,
  connect(null, mapDispatchToProps),
  form({
    mapPropsToValues: ({ prescriptionResult }) => ({
      name: prescriptionResult.name,
      purpose: prescriptionResult.purpose,
      notes: prescriptionResult.notes,
      instructives: prescriptionResult.instructives,
      scope: prescriptionResult.scope,
      refs: prescriptionResult.refs
    }),
    validationSchema,
    handleChange: props => {
      return (key, onChange) => {
        return value => {
          onChange(value);
          return props.updatePrescriptionResult({ [key]: value });
        };
      };
    }
  })
])(EditPrescriptionResult);
