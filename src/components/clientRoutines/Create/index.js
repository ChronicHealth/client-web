// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';
import { getRoutine } from '@client/actions/pages/homes';
import { Button } from 'ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { getDefaultRoutine } from '@client/selectors/routines';
import { validationSchema } from '@client/utils/clientRoutines';
import {
  create as createClientRoutine,
  goToClientRoutine
} from '@client/actions/clientRoutines';
import uuid from 'uuid/v1';
import RoutineForm from 'components/routines/Form';
import { createStructuredSelector } from 'reselect';

type $ownProps = {};

type $stateProps = {
  defaultRoutine: Object
};

type $dispatchProps = {
  createClientRoutine: Function,
  goToClientRoutine: Function,
  getRoutine: Function
};

type $props = $stateProps & $dispatchProps & $ownProps & $$formProps;

export class CreateClientRoutine extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getRoutine();
  }
  useDefaultRoutine = () => {
    const { defaultRoutine, fields } = this.props;
    fields.bodyLevels.onChange(defaultRoutine.bodyLevels.toArray());
    fields.prescriptions.onChange(defaultRoutine.prescriptions.toArray());
  };
  render() {
    const { props } = this;
    return (
      <div>
        <h1>Create Routine</h1>
        <Button onClick={this.useDefaultRoutine}>Use Default Routine</Button>
        <RoutineForm noNameDescription fields={this.props.fields} />
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
      createClientRoutine,
      goToClientRoutine,
      getRoutine
    },
    dispatch
  );

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  defaultRoutine: getDefaultRoutine
});

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  form({
    mapPropsToValues: () => ({
      prescriptions: [],
      bodyLevels: []
    }),
    validationSchema,
    handleSubmit: (values, { props }) => {
      const id = uuid();
      return props.createClientRoutine({
        ...values,
        id,
        clientId: props.clientId
      });
    }
  })
])(CreateClientRoutine);
