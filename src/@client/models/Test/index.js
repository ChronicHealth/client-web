// @flow

import { Record, List } from 'immutable';
import { transform } from '@client/utils/models';

export const properties = {
  name: '',
  notes: '',
  instructives: '',
  refs: new List(),
  id: ''
};

export default class Prescription extends Record(properties) {
  constructor(props: Object = {}) {
    super(
      transform(props, {
        refs: List
      })
    );
  }
}
