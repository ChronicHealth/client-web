// @flow
import React from 'react';
import { UL, ULItem } from 'ui-kit';
import { flowRight } from 'lodash';
import { push } from '@client/actions/router';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { getScopes } from '@client/actions/users';
import { bindActionCreators } from '@client/utils/components';
import { createStructuredSelector } from 'reselect';
import { getRelated } from '@client/selectors/users';
import ScopeItem from '../Item';

type $stateProps = {
  scopeIds: List<$$id>
};
type $dispatchProps = {
  goToCreateScope: Function,
  getScopes: Function
};
type $ownProps = {
  canEdit: boolean,
  userId: $$id
};

type $props = $stateProps & $dispatchProps & $ownProps;

export class MyScopes extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getScopes();
  }
  render() {
    const { canEdit } = this.props;
    return (
      <div>
        <UL>
          {canEdit && (
            <ULItem
              onClick={this.props.goToCreateScope}
              selectable
              caption="Create Scope"
              leftIcon="add"
            />
          )}
          {this.props.scopeIds.map(id => {
            return <ScopeItem canEdit={canEdit} key={id} id={id} />;
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
      goToCreateScope: () => push('/scopes/create'),
      getScopes: () => getScopes(props.userId)
    },
    dispatch
  );

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  scopeIds: getRelated('scopes', (state, props) => props.userId)
});
export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  MyScopes
);
