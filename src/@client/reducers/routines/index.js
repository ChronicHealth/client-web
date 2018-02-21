// @flow
import Model from '@client/models/Routine';
import schema from '@client/schemas/routines';
import {
  entityReducer,
  relationshipReducer,
  getValueFunc
} from '@client/utils/reducers';

const entityName = 'routines';

export const relationship = {
  ...relationshipReducer(entityName, getValueFunc(schema))
};

export const entity = {
  ...entityReducer(entityName, ent => new Model(ent))
};

export const initialState = {};
