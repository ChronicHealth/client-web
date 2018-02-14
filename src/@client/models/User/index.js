// @flow

import { Record } from 'immutable';

export const properties = {
  username: '',
  email: '',
  id: ''
};

export default class User extends Record(properties) {}
