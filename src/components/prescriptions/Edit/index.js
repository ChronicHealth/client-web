// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';
import Yup from 'yup';
import { Button } from 'ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import {
  update as updatePrescription,
  goToPrescription
} from '@client/actions/prescriptions';
import uuid from 'uuid/v1';
import IssuesButton from 'components/issues/Button';
import { types } from '@client/models/Issue';
import PrescriptionForm from '../Form';
import { createStructuredSelector } from 'reselect';
import getPrescription from '../get';

type $props = Object;

export class EditPrescription extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>{props.prescription.name}</h1>
        <PrescriptionForm fields={this.props.fields} />
        <IssuesButton id={props.id} type={types.PRESCRIPTION} />
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch, { id }) =>
  bindActionCreators(
    {
      updatePrescription: values => updatePrescription(id, values),
      goToPrescription
    },
    dispatch
  );

const array = Yup.array()
  .of(Yup.string())
  .required();

export default flowRight([
  getPrescription.connect,
  connect(null, mapDispatchToProps),
  form({
    enableReinitialize: true,
    mapPropsToValues: ({ prescription }) => ({
      name: prescription.name,
      purpose: prescription.purpose.toJS(),
      notes: prescription.notes,
      instructives: prescription.instructives,
      scope: prescription.scope,
      refs: prescription.refs.toJS()
    }),
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      purpose: array,
      notes: Yup.string().required(),
      instructives: Yup.string().required(),
      scope: Yup.string().required(),
      refs: array
    }),
    handleChange: props => {
      return (key, onChange) => {
        return value => {
          onChange(value);
          return props.updatePrescription({ [key]: value });
        };
      };
    }
  }),
  getPrescription.khange
])(EditPrescription);
