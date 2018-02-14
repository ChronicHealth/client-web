// @flow

import { Record } from 'immutable';

export const properties = {
  token: '',
  id: ''
};

export default class Session extends Record(properties) {}
