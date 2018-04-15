// @flow

import { Record, List } from 'immutable';
import { transform } from '@client/utils/models';

export const properties = {
  scopes: new List(),
  amountRange: ''
};

export default class BodyLevelScope extends Record(properties) {
  constructor(props: Object = {}) {
    super(
      transform(props, {
        scopes: List
      })
    );
  }
}
