// @flow

import khange, { kheck } from 'khange';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getParam } from '@client/selectors/router';
import { flowRight } from 'lodash';
import * as testResultSelectors from '@client/selectors/testResults';
import TestResult from '@client/models/TestResult';
import { get } from '@client/actions/testResults';
import { bindActionCreators } from '@client/utils/components';
import { formParent } from '@client/hocs';

const getTestResultId = getParam('testResultId');

export type $stateProps = {
  id: $$id,
  testResult: TestResult
};

type $dispatchProps = {
  get: Function
};

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  id: getTestResultId,
  testResult: testResultSelectors.find(getTestResultId)
});

export const mapDispatchToProps = (
  dispatch: $$dispatch
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      get
    },
    dispatch
  );

export const onKhange = (
  props: $$formParentProps & $stateProps & $dispatchProps
) => {
  props.get(props.id).then(() => {
    if (props.reinitializeForm) props.reinitializeForm.go();
  });
};

export default flowRight([
  formParent,
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('id'), onKhange)
]);
