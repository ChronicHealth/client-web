// @flow
import * as React from 'react';
import { ULItem } from 'ui-kit';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import * as clientRoutineSelectors from '@client/selectors/clientRoutines';
import {
  goToEditClientRoutine,
  goToClientRoutine
} from '@client/actions/clientRoutines';
import { bindActionCreators } from '@client/utils/components';
import ClientRoutine from '@client/models/ClientRoutine';

type $stateProps = {
  clientRoutine: ClientRoutine
};

type $ownProps = {
  id: $$id,
  canEdit?: boolean
};

type $dispatchProps = {
  goToEditClientRoutine: Function,
  goToClientRoutine: Function
};

type $props = $ownProps & $stateProps & $dispatchProps;

export class ClientRoutineItem extends React.PureComponent<$props> {
  render() {
    const {
      canEdit,
      clientRoutine,
      goToEditClientRoutine,
      goToClientRoutine,
      ...props
    } = this.props;
    return (
      <ULItem
        {...props}
        onClick={canEdit ? goToEditClientRoutine : goToClientRoutine}
        caption={clientRoutine.name}
      />
    );
  }
}

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  clientRoutine: clientRoutineSelectors.find()
});

export const mapDispatchToProps = (
  dispatch: $$dispatch,
  props: $props
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      goToEditClientRoutine: () => goToEditClientRoutine(props.id),
      goToClientRoutine: () => goToClientRoutine(props.id)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ClientRoutineItem);
