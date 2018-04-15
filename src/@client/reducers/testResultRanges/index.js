// @flow
import Model from '@client/models/TestResultRange';
import schema from '@client/schemas/testResultRanges';
import {
  entityReducer,
  relationshipReducer,
  getValueFunc
} from '@client/utils/reducers';

const entityName = 'testResultRanges';

export const relationship = {
  ...relationshipReducer(entityName, getValueFunc(schema))
};

export const entity = {
  ...entityReducer(entityName, ent => new Model(ent))
};

export const initialState = {};
