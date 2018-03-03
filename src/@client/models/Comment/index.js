// @flow
import { Record } from 'immutable';

export const properties = {
  id: '',
  content: '',
  userId: ''
};
export default class Comment extends Record(properties) {}
