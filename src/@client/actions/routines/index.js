// @flow

import { baseActions, erActions } from '@client/utils/actions';
import { entity } from '@client/reducers/routines';
import service from '@client/services/routines';
import * as issuesService from '@client/services/issues';
import { push } from '@client/actions/router';
import { types } from '@client/models/Issue';

const base = baseActions('routines', entity, service);
const er = erActions('routines');

module.exports = {
  ...base,
  goToRoutine: id => push(`/routines/${id}`),
  goToEditRoutine: id => push(`/routines/${id}/edit`),
  getIssues: (id: $$id) => (dispatch: $$dispatch) => {
    return issuesService.byType(types.ROUTINE, id).then(issues => {
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
