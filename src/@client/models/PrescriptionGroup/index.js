// @flow
import { Record } from 'immutable';

export const properties = {
  id: 0,
  name: '',
  notes: ''
};
export default class PrescriptionGroup extends Record(properties) {}
