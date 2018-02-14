// @flow

import { baseActions } from '@client/utils/actions';
import { entity } from '@client/reducers/users';
import service from '@client/services/users';
import * as sessionActions from '@client/actions/pages/sessions';
import { push } from '@client/actions/router';
/* eslint-disable */
const { create, ...base } = baseActions('users', entity, service);
/* eslint-enable */
module.exports = {
  ...base,
  create: values => dispatch => {
    return service.create(values).then(({ session, user }) => {
      dispatch(sessionActions.login(session, { ...user, ...values }));
    });
  },
  goToUser: id => push(`/users/${id}`)
};
