// @flow
import { Record } from 'immutable';

export const properties = {
  id: 0,
  content: ''
};
export default class Comment extends Record(properties) {}
