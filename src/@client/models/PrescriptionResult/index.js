// @flow
import { Record, Map, fromJS } from 'immutable';
import { transform } from '@client/utils/models';

export const properties = {
  id: 0,
  data: Map()
};
export default class PrescriptionResult extends Record(properties) {
  constructor(opts = {}) {
    super(
      transform(opts, {
        data: data => fromJS(data || {})
      })
    );
  }
}
