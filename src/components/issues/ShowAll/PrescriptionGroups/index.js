// @flow

import { flowRight } from 'lodash';
import IssuesShowAll from '../';
import { connect } from 'react-redux';
import { getParam } from '@client/selectors/router';
import { getRelated } from '@client/selectors/prescriptionGroups';
import { createStructuredSelector } from 'reselect';
import { types } from '@client/models/Issue';

const prescriptionGroupId = getParam('prescriptionGroupId');

const mapStateToProps = createStructuredSelector({
  id: prescriptionGroupId,
  issueIds: getRelated('issues', prescriptionGroupId),
  type: () => types.PRESCRIPTION
});

export default flowRight([connect(mapStateToProps)])(IssuesShowAll);
