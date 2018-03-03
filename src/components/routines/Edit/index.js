// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { update as updateRoutine, goToRoutine } from '@client/actions/routines';
import RoutineForm from '../Form';
import getRoutine from '../get';
import { validationSchema } from '@client/utils/routines';

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
    mapPropsToValues: ({ routine }) => ({
      name: routine.name,
      description: routine.description,
      prescriptions: routine.prescriptions.toJS(),
      tests: routine.tests.toJS()
    }),
    validationSchema,
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
