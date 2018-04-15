// @flow
import React from 'react';
import { UL, ULItem } from 'ui-kit';
import { flowRight } from 'lodash';
import { push } from '@client/actions/router';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { getClientRoutines } from '@client/actions/users';
import { bindActionCreators } from '@client/utils/components';
import { createStructuredSelector } from 'reselect';
import { getRelated } from '@client/selectors/pages/homes';
import ClientRoutineItem from '../Item';

type $stateProps = {
  clientRoutineIds: List<$$id>
};
type $dispatchProps = {
  goToCreateClientRoutine: Function,
  getClientRoutines: Function
};
type $ownProps = {
  canEdit: boolean,
  userId: $$id
};

type $props = $stateProps & $dispatchProps & $ownProps;

export class MyClientRoutines extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getClientRoutines();
  }
  render() {
    const { canEdit } = this.props;
    return (
      <div>
        <UL>
          {canEdit && (
            <ULItem
              onClick={this.props.goToCreateClientRoutine}
              selectable
              caption="Create ClientRoutine"
              leftIcon="add"
            />
          )}
          {this.props.clientRoutineIds.map(id => {
            return <ClientRoutineItem canEdit={canEdit} key={id} id={id} />;
          })}
        </UL>
      </div>
    );
  }
}

export const mapDispatchToProps = (
  dispatch: $$dispatch,
  props: $ownProps
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      goToCreateClientRoutine: () => push('/clientRoutines/create'),
      getClientRoutines: () => getClientRoutines(props.userId)
    },
    dispatch
  );

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  clientRoutineIds: getRelated('clientRoutines')
});
export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  MyClientRoutines
);
