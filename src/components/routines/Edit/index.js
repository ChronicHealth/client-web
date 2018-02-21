// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';
import Yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { update as updateRoutine, goToRoutine } from '@client/actions/routines';
import uuid from 'uuid/v1';
import RoutineForm from '../Form';
import getRoutine from '../get';

type $props = Object;

export class EditRoutine extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>{props.routine.name}</h1>
        <RoutineForm fields={this.props.fields} />
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch, { id }) =>
  bindActionCreators(
    {
      updateRoutine: values => updateRoutine(id, values),
      goToRoutine
    },
    dispatch
  );

export default flowRight([
  getRoutine,
  connect(null, mapDispatchToProps),
  form({
    mapPropsToValues: ({ routine, prescriptionIds, testIds }) => ({
      name: routine.name,
      description: routine.description,
      prescriptions: prescriptionIds.toArray(),
      tests: testIds.toArray()
    }),
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      prescriptions: Yup.array()
        .of(Yup.string().required())
        .required(),
      tests: Yup.array().of(Yup.string().required())
    }),
    handleChange: props => {
      return (key, onChange) => {
        return value => {
          onChange(value);
          return props.updateRoutine({ [key]: value });
        };
      };
    }
  })
])(EditRoutine);
