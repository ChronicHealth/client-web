// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';

import { Button } from 'ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { validationSchema } from '@client/utils/prescriptionResults';
import {
  create as createPrescriptionResult,
  goToPrescriptionResult
} from '@client/actions/prescriptionResults';
import uuid from 'uuid/v1';
import PrescriptionResultForm from '../Form';

type $ownProps = {};

type $stateProps = {};

type $dispatchProps = {
  createPrescriptionResult: Function,
  goToPrescriptionResult: Function
};

type $props = $stateProps & $dispatchProps & $ownProps & $$formProps;

export class CreatePrescriptionResult extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>Create PrescriptionResult</h1>
        <PrescriptionResultForm fields={this.props.fields} />
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
      createPrescriptionResult,
      goToPrescriptionResult
    },
    dispatch
  );

export default flowRight([
  connect(null, mapDispatchToProps),
  form({
    mapPropsToValues: () => ({
      name: '',
      notes: '',
      instructives: '',
      refs: []
    }),
    validationSchema,
    handleSubmit: (values, { props }) => {
      const id = uuid();
      props.goToPrescriptionResult(id);
      return props.createPrescriptionResult({ ...values, id });
    }
  })
])(CreatePrescriptionResult);
