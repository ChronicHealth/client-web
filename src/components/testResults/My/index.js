// @flow
import React from 'react';
import { UL, ULItem } from 'ui-kit';
import { flowRight } from 'lodash';
import { push } from '@client/actions/router';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { getTestResults } from '@client/actions/users';
import { bindActionCreators } from '@client/utils/components';
import { createStructuredSelector } from 'reselect';
import { getRelated } from '@client/selectors/pages/homes';
import TestResultItem from '../Item';

type $stateProps = {
  testResultIds: List<$$id>
};
type $dispatchProps = {
  goToCreateTestResult: Function,
  getTestResults: Function
};
type $ownProps = {
  canEdit: boolean,
  userId: $$id
};

type $props = $stateProps & $dispatchProps & $ownProps;

export class MyTestResults extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getTestResults();
  }
  render() {
    const { canEdit } = this.props;
    return (
      <div>
        <UL>
          {canEdit && (
            <ULItem
              onClick={this.props.goToCreateTestResult}
              selectable
              caption="Create TestResult"
              leftIcon="add"
            />
          )}
          {this.props.testResultIds.map(id => {
            return <TestResultItem canEdit={canEdit} key={id} id={id} />;
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
      goToCreateTestResult: () => push('/testResults/create'),
      getTestResults: () => getTestResults(props.userId)
    },
    dispatch
  );

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  testResultIds: getRelated('testResults')
});
export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  MyTestResults
);
