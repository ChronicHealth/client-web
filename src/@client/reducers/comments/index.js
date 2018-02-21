// @flow
import Model from '@client/models/Comment';
import schema from '@client/schemas/comments';
import {
  entityReducer,
  relationshipReducer,
  getValueFunc
} from '@client/utils/reducers';

const entityName = 'comments';

export const relationship = {
  ...relationshipReducer(entityName, getValueFunc(schema))
};

export const entity = {
  ...entityReducer(entityName, ent => new Model(ent))
};

export const initialState = {};
