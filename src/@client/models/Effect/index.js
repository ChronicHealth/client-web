// @flow
import { Record, List } from 'immutable';
import { transform } from '../../utils/models';

export const properties = {
  id: 0,
  name: '',
  description: '',
  refs: List()
};
export default class Effect extends Record(properties) {
  constructor(opts: $Shape<typeof properties> = {}) {
    super(
      transform(opts, {
        refs: List
      })
    );
  }
}
