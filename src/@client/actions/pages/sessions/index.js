// @flow
import services from '@client/services/sessions';
import { login, logout } from './noService';

module.exports = {
  login,
  logout,
  create: ({ email, password }: Object) => (dispatch: $$dispatch) => {
    return services
      .create({
        email,
        loginToken: password
      })
      .then(({ token, user }) => {
        dispatch(login(token, user));
        return user;
      });
  },
  checkIfLoggedIn: () => (dispatch: $$dispatch) => {
    return services
      .checkIfLoggedIn()
      .then(({ user, token }) => {
        return dispatch(login(token, user));
      })
      .catch(() => {});
  }
};
