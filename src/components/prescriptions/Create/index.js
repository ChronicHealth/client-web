// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';
import Yup from 'yup';
import { Button } from 'ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  create as createPrescription,
  goToPrescription
} from '@client/actions/prescriptions';
import uuid from 'uuid/v1';
import PrescriptionForm from '../Form';

type $props = Object;

export class CreatePrescription extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>Create Prescription</h1>
        <PrescriptionForm fields={this.props.fields} />
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
// $FlowFixMe
export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      createPrescription,
      goToPrescription
    },
    dispatch
  );

const array = Yup.array()
  .of(Yup.string())
  .required();

export default flowRight([
  connect(null, mapDispatchToProps),
  form({
    mapPropsToValues: () => ({
      name: '',
      purpose: [],
      notes: '',
      instructives: '',
      scope: '',
      refs: []
    }),
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      purpose: array,
      notes: Yup.string().required(),
      instructives: Yup.string().required(),
      scope: Yup.string().required(),
      refs: array
    }),
    handleSubmit: (values, { props }) => {
      const id = uuid();
      props.goToPrescription(id);
      return props.createPrescription({ ...values, id });
    }
  })
])(CreatePrescription);