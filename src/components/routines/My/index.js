// @flow
import React from 'react';
import { UL, ULItem } from 'ui-kit';
import { flowRight } from 'lodash';
import { push } from '@client/actions/router';
import { connect } from 'react-redux';
import { getRoutines } from '@client/actions/pages/myRoutines';
import { bindActionCreators } from '@client/utils/components';
import { createStructuredSelector } from 'reselect';
import * as pageRoutineSelectors from '@client/selectors/pages/myRoutines';
import RoutineItem from '../Item';

type $props = Object;

export class MyRoutines extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getRoutines();
  }
  render() {
    const { canEdit } = this.props;
    return (
      <div>
        <UL>
          {canEdit && (
            <ULItem
              onClick={this.props.goToCreateRoutine}
              selectable
              caption="Create Routine"
              leftIcon="add"
            />
          )}
          {this.props.routineIds.map(id => {
            return <RoutineItem canEdit={canEdit} key={id} id={id} />;
          })}
        </UL>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch, props: Object) =>
  bindActionCreators(
    {
      goToCreateRoutine: () => push('/routines/create'),
      getRoutines: () => getRoutines(props.userId)
    },
    dispatch
  );

export const mapStateToProps = createStructuredSelector({
  routineIds: pageRoutineSelectors.getRelated('routines')
});
export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  MyRoutines
);
