// @flow

import { baseActions, erActions } from '@client/utils/actions';
import { entity } from '@client/reducers/prescriptions';
import service from '@client/services/prescriptions';
import * as issuesService from '@client/services/issues';
import { push } from '@client/actions/router';
import { types } from '@client/models/Issue';

const base = baseActions('prescriptions', entity, service);
const er = erActions('prescriptions');

module.exports = {
  ...base,
  goToPrescription: id => push(`/prescriptions/${id}`),
  goToEditPrescription: id => push(`/prescriptions/${id}/edit`),
  getIssues: (id: $$id) => (dispatch: $$dispatch) => {
    return issuesService.byType(types.PRESCRIPTION, id).then(issues => {
      dispatch(
        er.get({
          id,
          issues
        })
      );
      return issues;
    });
  }
};
