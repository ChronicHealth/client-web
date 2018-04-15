// @flow

import { flowRight } from 'lodash';
import { List } from 'immutable';
import IssuesShowAll from '../';
import { connect } from 'react-redux';
import { getParam } from '@client/selectors/router';
import { getRelated } from '@client/selectors/clientRoutines';
import { createStructuredSelector } from 'reselect';
import { types } from '@client/models/Issue';

const clientRoutineId = getParam('clientRoutineId');

type $stateProps = {
  id: $$id,
  issueIds: List<$$id>,
  type: number
};

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  id: clientRoutineId,
  issueIds: getRelated('issues', clientRoutineId),
  type: () => types.CLIENTROUTINE
});

export default flowRight([connect(mapStateToProps)])(IssuesShowAll);
