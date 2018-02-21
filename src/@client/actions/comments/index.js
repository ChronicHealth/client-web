// @flow

import { baseActions } from '@client/utils/actions';
import { entity } from '@client/reducers/comments';
import service from '@client/services/comments';
import { push } from '@client/actions/router';

const base = baseActions('comments', entity, service);

module.exports = {
  ...base,
  goToComment: id => push(`/comments/${id}`)
};
