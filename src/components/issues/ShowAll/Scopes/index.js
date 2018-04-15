// @flow

import { flowRight } from 'lodash';
import { List } from 'immutable';
import IssuesShowAll from '../';
import { connect } from 'react-redux';
import { getParam } from '@client/selectors/router';
import { getRelated } from '@client/selectors/scopes';
import { createStructuredSelector } from 'reselect';
import { types } from '@client/models/Issue';

const scopeId = getParam('scopeId');

type $stateProps = {
  id: $$id,
  issueIds: List<$$id>,
  type: number
};

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  id: scopeId,
  issueIds: getRelated('issues', scopeId),
  type: () => types.SCOPE
});

export default flowRight([connect(mapStateToProps)])(IssuesShowAll);
