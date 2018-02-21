// @flow
import { Record } from 'immutable';

export const properties = {
  id: 0,
  name: '',
  description: ''
};
export default class Routine extends Record(properties) {}
