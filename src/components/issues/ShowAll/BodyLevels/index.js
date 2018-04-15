// @flow

import { flowRight } from 'lodash';
import { List } from 'immutable';
import IssuesShowAll from '../';
import { connect } from 'react-redux';
import { getParam } from '@client/selectors/router';
import { getRelated } from '@client/selectors/bodyLevels';
import { createStructuredSelector } from 'reselect';
import { types } from '@client/models/Issue';

const bodyLevelId = getParam('bodyLevelId');

type $stateProps = {
  id: $$id,
  issueIds: List<$$id>,
  type: number
};

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  id: bodyLevelId,
  issueIds: getRelated('issues', bodyLevelId),
  type: () => types.BODYLEVEL
});

export default flowRight([connect(mapStateToProps)])(IssuesShowAll);
