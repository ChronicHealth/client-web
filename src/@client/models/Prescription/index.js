// @flow

import { Record, List } from 'immutable';
import { transform } from '@client/utils/models';
import PrescriptionScope from './Scope';

export const properties = {
  name: '',
  notes: '',
  scopes: new List(),
  refs: new List(),
  effects: new List(),
  id: ''
};

export default class Prescription extends Record(properties) {
  constructor(props: Object = {}) {
    super(
      transform(props, {
        refs: List,
        effects: List,
        scopes: scopes => {
          return new List(
            scopes ? scopes.map(scope => new PrescriptionScope(scope)) : []
          );
        }
      })
    );
  }
}
