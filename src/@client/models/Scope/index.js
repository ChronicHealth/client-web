// @flow
import { Record, List } from 'immutable';
import { transform } from '../../utils/models';

export const properties = {
  id: 0,
  name: '',
  description: '',
  refs: List()
};
export default class Scope extends Record(properties) {
  constructor(ops: $Shape<typeof properties> = {}) {
    super(
      transform(ops, {
        refs: List
      })
    );
  }
}
