// @flow

import { Record, List } from 'immutable';
import { transform } from '@client/utils/models';

export const properties = {
  name: '',
  notes: '',
  bodyLevels: new List(),
  refs: new List(),
  id: ''
};

export default class Test extends Record(properties) {
  constructor(props: Object = {}) {
    super(
      transform(props, {
        refs: List,
        bodyLevels: List
      })
    );
  }
}
