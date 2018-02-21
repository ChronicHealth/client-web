// @flow
import Model from '@client/models/Issue';
import schema from '@client/schemas/issues';
import {
  entityReducer,
  relationshipReducer,
  getValueFunc
} from '@client/utils/reducers';

const entityName = 'issues';

export const relationship = {
  ...relationshipReducer(entityName, getValueFunc(schema))
};

export const entity = {
  ...entityReducer(entityName, ent => new Model(ent))
};

export const initialState = {};
