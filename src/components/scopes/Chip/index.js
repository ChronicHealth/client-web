// @flow
import * as React from 'react';
import { flowRight } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Chip } from 'ui-kit';
import Scope from '@client/models/Scope';
import { find } from '@client/selectors/scopes';

type $stateProps = { scope: Scope };
type $ownProps = { id: $$id };
type $dispatchProps = {};
type $props = $stateProps & $dispatchProps & $ownProps;

export class ScopeChip extends React.PureComponent<$props> {
  render() {
    const { scope, ...props } = this.props;
    let deletable = false;
    if (props.onDeleteClick) {
      deletable = true;
    }
    return (
      <Chip deletable={deletable} {...props}>
        {scope.name}
      </Chip>
    );
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  scope: find()
});

export default flowRight([connect(mapStateToProps)])(ScopeChip);
