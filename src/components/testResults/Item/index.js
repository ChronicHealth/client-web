// @flow
import * as React from 'react';
import { ULItem } from 'ui-kit';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import * as testResultSelectors from '@client/selectors/testResults';
import {
  goToEditTestResult,
  goToTestResult
} from '@client/actions/testResults';
import { bindActionCreators } from '@client/utils/components';
import TestResult from '@client/models/TestResult';

type $stateProps = {
  testResult: TestResult
};

type $ownProps = {
  id: $$id,
  canEdit?: boolean
};

type $dispatchProps = {
  goToEditTestResult: Function,
  goToTestResult: Function
};

type $props = $ownProps & $stateProps & $dispatchProps;

export class TestResultItem extends React.PureComponent<$props> {
  render() {
    const {
      canEdit,
      testResult,
      goToEditTestResult,
      goToTestResult,
      ...props
    } = this.props;
    return (
      <ULItem
        {...props}
        onClick={canEdit ? goToEditTestResult : goToTestResult}
        caption={testResult.name}
      />
    );
  }
}

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  testResult: testResultSelectors.find()
});

export const mapDispatchToProps = (
  dispatch: $$dispatch,
  props: $props
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      goToEditTestResult: () => goToEditTestResult(props.id),
      goToTestResult: () => goToTestResult(props.id)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TestResultItem);
