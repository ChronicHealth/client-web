// @flow
import { Record } from 'immutable';

export const properties = {
  id: '',
  username: '',
  description: '',
  blurb: '',
  location: ''
};

export default class User extends Record(properties) {}
