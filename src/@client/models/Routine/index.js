// @flow
import { Record, List } from 'immutable';
import { transform } from '@client/utils/models';

export const properties = {
  id: 0,
  name: '',
  description: ''
  // bodyLevels: List(),
  // prescriptions: List()
};
export default class Routine extends Record(properties) {
  constructor(opts: Object = {}) {
    super(
      transform(opts, {
        // bodyLevels: List,
        // prescriptions: List
      })
    );
  }
}
