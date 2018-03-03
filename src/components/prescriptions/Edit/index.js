// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';
import Yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import {
  update as updatePrescription,
  goToPrescription
} from '@client/actions/prescriptions';
import IssuesButton from 'components/issues/Button';
import { types } from '@client/models/Issue';
import PrescriptionForm from '../Form';
import getPrescription from '../get';
import { validationSchema } from '../../../@client/utils/prescriptions';

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

export const mapDispatchToProps = (dispatch: $$dispatch, { id }: $props) =>
  bindActionCreators(
    {
      updatePrescription: values => updatePrescription(id, values),
      goToPrescription
    },
    dispatch
  );

export default flowRight([
  getPrescription,
  connect(null, mapDispatchToProps),
  form({
    mapPropsToValues: ({ prescription }) => ({
      name: prescription.name,
      effects: prescription.effects.toJS(),
      notes: prescription.notes,
      scopes: prescription.scopes.toJS(),
      refs: prescription.refs.toJS()
    }),
    validationSchema,
    handleChange: props => {
      return (key, onChange) => {
        return value => {
          onChange(value);
          return props.updatePrescription({ [key]: value });
        };
      };
    }
  })
])(EditPrescription);
