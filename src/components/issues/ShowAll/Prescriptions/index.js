// @flow

import { flowRight } from 'lodash';
import IssuesShowAll from '../';
import { connect } from 'react-redux';
import { getParam } from '@client/selectors/router';
import { getRelated } from '@client/selectors/prescriptions';
import { createStructuredSelector } from 'reselect';
import { types } from '@client/models/Issue';

const prescriptionId = getParam('prescriptionId');

const mapStateToProps = createStructuredSelector({
  id: prescriptionId,
  issueIds: getRelated('issues', prescriptionId),
  type: () => types.PRESCRIPTION
});

export default flowRight([connect(mapStateToProps)])(IssuesShowAll);
