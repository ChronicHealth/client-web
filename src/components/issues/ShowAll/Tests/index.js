// @flow

import { flowRight } from 'lodash';
import IssuesShowAll from '../';
import { connect } from 'react-redux';
import { getParam } from '@client/selectors/router';
import { getRelated } from '@client/selectors/tests';
import { createStructuredSelector } from 'reselect';
import { types } from '@client/models/Issue';

const testId = getParam('testId');

const mapStateToProps = createStructuredSelector({
  id: testId,
  issueIds: getRelated('issues', testId),
  type: () => types.TEST
});

export default flowRight([connect(mapStateToProps)])(IssuesShowAll);
