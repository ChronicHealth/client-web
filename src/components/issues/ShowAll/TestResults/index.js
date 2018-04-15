// @flow

import { flowRight } from 'lodash';
import { List } from 'immutable';
import IssuesShowAll from '../';
import { connect } from 'react-redux';
import { getParam } from '@client/selectors/router';
import { getRelated } from '@client/selectors/testResults';
import { createStructuredSelector } from 'reselect';
import { types } from '@client/models/Issue';

const testResultId = getParam('testResultId');

type $stateProps = {
  id: $$id,
  issueIds: List<$$id>,
  type: number
};

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  id: testResultId,
  issueIds: getRelated('issues', testResultId),
  type: () => types.TESTRESULT
});

export default flowRight([connect(mapStateToProps)])(IssuesShowAll);
