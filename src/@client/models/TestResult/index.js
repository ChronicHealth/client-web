// @flow
import { Record } from 'immutable';

export const properties = {
  id: '',
  amount: ''
};
export default class TestResult extends Record(properties) {}
