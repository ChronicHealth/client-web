// @flow
import Model from '@client/models/TestResult';
import schema from '@client/schemas/testResults';
import {
  entityReducer,
  relationshipReducer,
  getValueFunc
} from '@client/utils/reducers';

const entityName = 'testResults';

export const relationship = {
  ...relationshipReducer(entityName, getValueFunc(schema))
};

export const entity = {
  ...entityReducer(entityName, ent => new Model(ent))
};

export const initialState = {};
