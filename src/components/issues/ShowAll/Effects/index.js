// @flow

import { flowRight } from 'lodash';
import { List } from 'immutable';
import IssuesShowAll from '../';
import { connect } from 'react-redux';
import { getParam } from '@client/selectors/router';
import { getRelated } from '@client/selectors/effects';
import { createStructuredSelector } from 'reselect';
import { types } from '@client/models/Issue';

const effectId = getParam('effectId');

type $stateProps = {
  id: $$id,
  issueIds: List<$$id>,
  type: number
};

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  id: effectId,
  issueIds: getRelated('issues', effectId),
  type: () => types.EFFECT
});

export default flowRight([connect(mapStateToProps)])(IssuesShowAll);
