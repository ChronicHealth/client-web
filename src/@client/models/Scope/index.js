// @flow
import { Record } from 'immutable';

export const properties = {
  id: 0,
  name: ''
};
export default class Scope extends Record(properties) {}
