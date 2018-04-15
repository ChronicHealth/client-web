// @flow
import { Record, List } from 'immutable';
import { transform } from '@client/utils/models';
import BodyLevelScope from './Scope';

export const properties = {
  id: 0,
  name: '',
  notes: '',
  unit: '',
  prescriptions: List(),
  refs: List(),
  scopes: List()
};
export default class BodyLevel extends Record(properties) {
  constructor(opts: Object = {}) {
    super(
      transform(opts, {
        prescriptions: List,
        refs: List,
        scopes: scopes => {
          return new List(
            scopes ? scopes.map(scope => new BodyLevelScope(scope)) : []
          );
        }
      })
    );
  }
}
