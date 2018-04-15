// @flow
import { Record } from 'immutable';

export const properties = {
  id: '',
  username: '',
  description: '',
  blurb: '',
  location: '',
  moderator: false
};

export default class User extends Record(properties) {}
