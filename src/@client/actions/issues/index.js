// @flow

import { baseActions, erActions } from '@client/utils/actions';
import { entity } from '@client/reducers/issues';
import * as service from '@client/services/issues';
import * as commentService from '@client/services/comments';
import { push } from '@client/actions/router';

const base = baseActions('issues', entity, service);
const erBase = erActions('issues');

module.exports = {
  ...base,
  goToIssue: (id: $$id) => push(`/issues/${id}`),
  getComments: (id: $$id) => (dispatch: $$dispatch) => {
    return commentService.byIssue(id).then(comments => {
      dispatch(erBase.get({ id, comments }));
      return comments;
    });
  },
  createComment: (issueId: $$id, values: Object) => (dispatch: $$dispatch) => {
    const comment = {
      ...values,
      issueId
    };
    return commentService.create(comment).then(() => {
      return dispatch(
        erBase.get(
          { id: issueId, comments: [comment] },
          { relationship: () => ({ actionName: 'concat' }) }
        )
      );
    });
  }
};
