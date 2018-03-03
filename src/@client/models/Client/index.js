// @flow
import { Record } from 'immutable';

export const properties = {
  id: 0,
  name: '',
  general: ''
};
export default class Client extends Record(properties) {}
