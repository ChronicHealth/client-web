// @flow

import { Record, List } from 'immutable';
import { transform } from '@client/utils/models';

export const properties = {
  scopes: new List(),
  amountRange: '',
  amountTime: '',
  amountFrequency: ''
};

export default class PrescriptionScope extends Record(properties) {
  constructor(props: Object = {}) {
    super(
      transform(props, {
        scopes: List
      })
    );
  }
}
