// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';
import Yup from 'yup';
import { Button } from 'ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import {
  create as createPrescription,
  goToPrescription
} from '@client/actions/prescriptions';
import uuid from 'uuid/v1';
import PrescriptionForm from '../Form';
import { validationSchema } from '../../../@client/utils/prescriptions';

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

export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      createPrescription,
      goToPrescription
    },
    dispatch
  );

export default flowRight([
  connect(null, mapDispatchToProps),
  form({
    mapPropsToValues: () => ({
      name: '',
      effects: [],
      notes: '',
      scopes: [
        {
          scopes: ['7624c780-1d93-11e8-911b-8f527e85fdf5'],
          amountRange: '25 mg',
          amountTime: '1 / day'
        }
      ],
      refs: []
    }),
    validationSchema,
    handleSubmit: (values, { props }) => {
      const id = uuid();
      props.goToPrescription(id);
      return props.createPrescription({ ...values, id });
    }
  })
])(CreatePrescription);
