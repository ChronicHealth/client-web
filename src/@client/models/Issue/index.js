// @flow
import { Record } from 'immutable';

export const properties = {
  id: 0,
  title: '',
  content: ''
};

export const types = {
  PRESCRIPTION: 1,
  TEST: 2,
  ROUTINE: 3
};

export const typeLabels = {
  [1]: 'prescriptions',
  [2]: 'tests',
  [3]: 'routines'
};
export default class Issue extends Record(properties) {}
