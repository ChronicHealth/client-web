// @flow

import { flowRight } from 'lodash';
import { List } from 'immutable';
import IssuesShowAll from '../';
import { connect } from 'react-redux';
import { getParam } from '@client/selectors/router';
import { getRelated } from '@client/selectors/prescriptionResults';
import { createStructuredSelector } from 'reselect';
import { types } from '@client/models/Issue';

const prescriptionResultId = getParam('prescriptionResultId');

type $stateProps = {
  id: $$id,
  issueIds: List<$$id>,
  type: number
};

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  id: prescriptionResultId,
  issueIds: getRelated('issues', prescriptionResultId),
  type: () => types.PRESCRIPTIONRESULT
});

export default flowRight([connect(mapStateToProps)])(IssuesShowAll);
