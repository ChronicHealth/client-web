// @flow

import { baseActions, erActions } from '@client/utils/actions';
import { entity } from '@client/reducers/tests';
import service from '@client/services/tests';
import { push } from '@client/actions/router';
import { types } from '@client/models/Issue';
import * as issuesService from '@client/services/issues';

const base = baseActions('tests', entity, service);
const er = erActions('tests');

module.exports = {
  ...base,
  goToTest: id => push(`/tests/${id}`),
  goToEditTest: id => push(`/tests/${id}/edit`),
  getIssues: (id: $$id) => (dispatch: $$dispatch) => {
    return issuesService.byType(types.TEST, id).then(issues => {
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
