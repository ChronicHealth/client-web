// @flow
import React from 'react';
import { UL } from 'ui-kit';
import { flowRight } from 'lodash';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { getClientRoutines } from '@client/actions/pages/homes';
import { bindActionCreators } from '@client/utils/components';
import { createStructuredSelector } from 'reselect';
import { getRelated } from '@client/selectors/pages/homes';
import ClientRoutineItem from '../Item';

type $stateProps = {
  clientRoutineIds: List<$$id>
};
type $dispatchProps = {
  getClientRoutines: Function
};
type $ownProps = {};

type $props = $stateProps & $dispatchProps & $ownProps;

export class ShowAllClientRoutines extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getClientRoutines();
  }
  render() {
    return (
      <div>
        <UL>
          {this.props.clientRoutineIds.map(id => {
            return <ClientRoutineItem key={id} id={id} />;
          })}
        </UL>
      </div>
    );
  }
}

export const mapDispatchToProps = (
  dispatch: $$dispatch
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      getClientRoutines
    },
    dispatch
  );

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  clientRoutineIds: getRelated('clientRoutines')
});
export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  ShowAllClientRoutines
);
