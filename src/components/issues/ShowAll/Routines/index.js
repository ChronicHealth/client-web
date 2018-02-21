// @flow

import { flowRight } from 'lodash';
import IssuesShowAll from '../';
import { connect } from 'react-redux';
import { getParam } from '@client/selectors/router';
import { getRelated } from '@client/selectors/routines';
import { createStructuredSelector } from 'reselect';
import { types } from '@client/models/Issue';

const routineId = getParam('routineId');

const mapStateToProps = createStructuredSelector({
  id: routineId,
  issueIds: getRelated('issues', routineId),
  type: () => types.ROUTINE
});

export default flowRight([connect(mapStateToProps)])(IssuesShowAll);
