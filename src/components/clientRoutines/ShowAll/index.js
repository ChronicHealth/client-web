// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UL } from 'ui-kit';
import { List } from 'immutable';
import ClientRoutineItem from '../Item';
import khange, { kheck } from 'khange';
import { getRoutines } from '@client/actions/clients';
import { getRelated } from '@client/selectors/clients';

type $stateProps = { clientRoutineIds: List<$$id> };
type $ownProps = {};
type $dispatchProps = { getRoutines: Function };
type $props = $stateProps & $dispatchProps & $ownProps;
export class ClientRoutinesShowAll extends React.PureComponent<$props> {
  render() {
    const props = this.props;
    return (
      <div>
        <h1>Select Routine</h1>
        <UL>
          {props.clientRoutineIds.map(id => (
            <ClientRoutineItem key={id} id={id} />
          ))}
        </UL>
      </div>
    );
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  clientRoutineIds: getRelated('clientRoutines')
});

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      getRoutines
    },
    dispatch
  );

const onKhange = props => props.getRoutines(props.clientId);

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('clientId'), onKhange)
])(ClientRoutinesShowAll);
