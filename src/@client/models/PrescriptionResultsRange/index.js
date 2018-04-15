// @flow
import { Record, List } from 'immutable';
import { transform } from '../../utils/models';

export const properties = {
  id: 0,
  data: List()
};
export default class PrescriptionResultsRange extends Record(properties) {
  constructor(opts = {}) {
    super(
      transform(opts, {
        data: List
      })
    );
  }
}
