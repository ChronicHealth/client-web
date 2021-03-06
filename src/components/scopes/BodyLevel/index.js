// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { findEntity } from '@client/selectors/scopes';
import { List } from 'immutable';
import Scope from '@client/models/Scope';

type $stateProps = { scopes: List<string> };
type $ownProps = {
  scope: Scope
};
type $dispatchProps = {};
type $props = $stateProps & $dispatchProps & $ownProps;

export class BodyLevelScope extends React.PureComponent<$props> {
  render() {
    const { scope, scopes, ...props } = this.props;
    return <p>{`${scopes.join(', ')} | ${scope.amountRange}${props.unit}`}</p>;
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  scopes: createSelector(
    [(state, props) => props.scope.scopes, findEntity()],
    (scopeIds, scopes) => {
      return scopeIds ? scopeIds.map(id => scopes.getIn([id, 'name'])) : List();
    }
  )
});

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators({}, dispatch);

export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  BodyLevelScope
);
