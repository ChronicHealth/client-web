// @flow
import React from 'react';
import { UL } from 'ui-kit';
import { flowRight } from 'lodash';
import { List } from 'immutable';
import { connect } from 'react-redux';
// import { getScopes } from '@client/actions/pages/homes';
import { bindActionCreators } from '@client/utils/components';
import { createStructuredSelector } from 'reselect';
// import { getRelated } from '@client/selectors/pages/homes';
import { scopeIds } from '@client/selectors/scopes';
import ScopeItem from '../Item';
import Instructions from '../../general/Instructions';

type $stateProps = {
  scopeIds: List<$$id>
};
type $dispatchProps = {
  // getScopes: Function,
};
type $ownProps = {};

type $props = $stateProps & $dispatchProps & $ownProps;

export class ShowAllScopes extends React.PureComponent<$props> {
  // componentWillMount() {
  //   this.props.getScopes();
  // }
  render() {
    return (
      <div>
        <Instructions content="A scope is a medically relevant classification of a person that be used throughout this site to provide more accurate actions for specific classes of people." />
        <UL>
          {this.props.scopeIds.map(id => {
            return <ScopeItem key={id} id={id} />;
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
      // getScopes
    },
    dispatch
  );

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  // scopeIds: getRelated('scopes')
  scopeIds
});
export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  ShowAllScopes
);
