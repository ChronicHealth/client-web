// @flow
import React from 'react';
import { UL } from 'ui-kit';
import { flowRight } from 'lodash';
import { connect } from 'react-redux';
import { getRoutines } from '@client/actions/pages/routines';
import { bindActionCreators } from '@client/utils/components';
import { createStructuredSelector } from 'reselect';
import * as pageRoutineSelectors from '@client/selectors/pages/routines';
import RoutineItem from '../Item';

type $props = Object;

export class ShowAllRoutines extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getRoutines();
  }
  render() {
    return (
      <div>
        <h1>Routines</h1>
        <UL>
          {this.props.routineIds.map(id => {
            return <RoutineItem key={id} id={id} />;
          })}
        </UL>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      getRoutines
    },
    dispatch
  );

export const mapStateToProps = createStructuredSelector({
  routineIds: pageRoutineSelectors.getRelated('routines')
});
export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  ShowAllRoutines
);
