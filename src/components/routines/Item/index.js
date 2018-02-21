// @flow
import * as React from 'react';
import { ULItem } from 'ui-kit';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import * as routineSelectors from '@client/selectors/routines';
import { goToEditRoutine, goToRoutine } from '@client/actions/routines';
import { bindActionCreators } from '@client/utils/components';

type $props = Object;

export class RoutineItem extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <ULItem
        onClick={props.canEdit ? props.goToEditRoutine : props.goToRoutine}
        caption={props.routine.name}
      />
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  routine: routineSelectors.find()
});

export const mapDispatchToProps = (dispatch: $$dispatch, props: $props) =>
  bindActionCreators(
    {
      goToEditRoutine: () => goToEditRoutine(props.id),
      goToRoutine: () => goToRoutine(props.id)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RoutineItem);
