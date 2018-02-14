// @flow
import * as storage from '@client/utils/localStorage';
import { pageERActions } from '@client/utils/actions';
import { entity } from '@client/reducers/pages';

const { get } = pageERActions('sessions');

const login = (token: string, user?: Object = {}) => {
  storage.set('token', token);
  return get({
    token,
    user: {
      ...user
    }
  });
};

const logout = () => {
  storage.remove('token');
  return entity.del('sessions');
};

module.exports = {
  login,
  logout
};
