// @flow
import React from 'react';
import { UL } from 'ui-kit';
import { flowRight } from 'lodash';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { getTestResults } from '@client/actions/pages/homes';
import { bindActionCreators } from '@client/utils/components';
import { createStructuredSelector } from 'reselect';
import { getRelated } from '@client/selectors/pages/homes';
import TestResultItem from '../Item';

type $stateProps = {
  testResultIds: List<$$id>
};
type $dispatchProps = {
  getTestResults: Function
};
type $ownProps = {};

type $props = $stateProps & $dispatchProps & $ownProps;

export class ShowAllTestResults extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getTestResults();
  }
  render() {
    return (
      <div>
        <UL>
          {this.props.testResultIds.map(id => {
            return <TestResultItem key={id} id={id} />;
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
      getTestResults
    },
    dispatch
  );

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  testResultIds: getRelated('testResults')
});
export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  ShowAllTestResults
);
