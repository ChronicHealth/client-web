// @flow
import * as React from 'react';
import { ULItem } from 'ui-kit';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import * as scopeSelectors from '@client/selectors/scopes';
import { goToEditScope, goToScope } from '@client/actions/scopes';
import { bindActionCreators } from '@client/utils/components';
import Scope from '@client/models/Scope';

type $stateProps = {
  scope: Scope
};

type $ownProps = {
  id: $$id,
  canEdit?: boolean
};

type $dispatchProps = {
  goToEditScope: Function,
  goToScope: Function
};

type $props = $ownProps & $stateProps & $dispatchProps;

export class ScopeItem extends React.PureComponent<$props> {
  render() {
    const { canEdit, scope, goToEditScope, goToScope, ...props } = this.props;
    return (
      <ULItem
        {...props}
        selectable
        onClick={canEdit ? goToEditScope : goToScope}
        caption={scope.name}
      />
    );
  }
}

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  scope: scopeSelectors.find()
});

export const mapDispatchToProps = (
  dispatch: $$dispatch,
  props: $props
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      goToEditScope: () => goToEditScope(props.id),
      goToScope: () => goToScope(props.id)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ScopeItem);
