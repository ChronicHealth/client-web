// @flow
import { baseActions, erActions } from '@client/utils/actions';
import { entity } from '@client/reducers/users';
import service from '@client/services/users';
import effectService from '@client/services/effects';
import scopeService from '@client/services/scopes';
import { byUser } from '@client/services/bodyLevels';
import * as sessionActions from '@client/actions/pages/sessions';
import { push } from '@client/actions/router';
/* eslint-disable */
const { create, ...base } = baseActions('users', entity, service);
const er = erActions('users');
/* eslint-enable */
module.exports = {
  ...base,
  getBodyLevels: (id: $$id) => (dispatch: $$dispatch) => {
    return byUser(id).then(bodyLevels => {
      dispatch(
        er.get({
          id,
          bodyLevels
        })
      );
      return bodyLevels;
    });
  },
  getEffects: (id: $$id) => (dispatch: $$dispatch) => {
    return effectService.byUser(id).then(effects => {
      dispatch(
        er.get({
          id,
          effects
        })
      );
      return effects;
    });
  },
  getScopes: (id: $$id) => (dispatch: $$dispatch) => {
    return scopeService.byUser(id).then(scopes => {
      dispatch(
        er.get({
          id,
          scopes
        })
      );
      return scopes;
    });
  },
  create: values => dispatch => {
    return service.create(values).then(({ session, user }) => {
      dispatch(sessionActions.login(session, { ...user, ...values }));
    });
  },
  goToUser: id => push(`/users/${id}`)
};
