// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';
import Yup from 'yup';
import { Button } from 'ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { create as createRoutine, goToRoutine } from '@client/actions/routines';
import { validationSchema } from '@client/utils/routines';
import uuid from 'uuid/v1';
import RoutineForm from '../Form';

type $props = Object;

export class CreateRoutine extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>Create Routine</h1>
        <RoutineForm fields={this.props.fields} />
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
      createRoutine,
      goToRoutine
    },
    dispatch
  );

// const array = Yup.array()
//   .of(Yup.string())
//   .required();

export default flowRight([
  connect(null, mapDispatchToProps),
  form({
    mapPropsToValues: () => ({
      prescriptions: [],
      tests: []
    }),
    validationSchema,
    handleSubmit: (values, { props }) => {
      const id = uuid();
      props.goToRoutine(id);
      return props.createRoutine({ ...values, id });
    }
  })
])(CreateRoutine);
