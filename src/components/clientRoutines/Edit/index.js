// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { update as updateClientRoutine } from '@client/actions/clientRoutines';
import { validationSchema } from '@client/utils/clientRoutines';
import RoutineForm from 'components/routines/Form';
import getClientRoutine from '../get';
import type { $stateProps as $getClientRoutineProps } from '../get';

type $stateProps = {};
type $dispatchProps = {
  updateClientRoutine: Function
};
type $ownProps = $getClientRoutineProps;

type $props = $stateProps & $dispatchProps & $ownProps & $$formProps;

export class EditClientRoutine extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <RoutineForm noNameDescription fields={this.props.fields} />
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch, { id }: $ownProps) =>
  bindActionCreators(
    {
      updateClientRoutine: values => updateClientRoutine(id, values)
    },
    dispatch
  );

export default flowRight([
  getClientRoutine,
  connect(null, mapDispatchToProps),
  form({
    mapPropsToValues: ({ prescriptionIds, bodyLevelIds }) => ({
      prescriptions: prescriptionIds.toArray(),
      bodyLevels: bodyLevelIds.toArray()
    }),
    validationSchema,
    handleChange: props => {
      return (key, onChange) => {
        return value => {
          onChange(value);
          return props.updateClientRoutine({ [key]: value });
        };
      };
    }
  })
])(EditClientRoutine);
