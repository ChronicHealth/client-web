// @flow
import Model from '@client/models/PrescriptionResultsRange';
import schema from '@client/schemas/prescriptionResultsRanges';
import {
  entityReducer,
  relationshipReducer,
  getValueFunc
} from '@client/utils/reducers';

const entityName = 'prescriptionResultsRanges';

export const relationship = {
  ...relationshipReducer(entityName, getValueFunc(schema))
};

export const entity = {
  ...entityReducer(entityName, ent => new Model(ent))
};

export const initialState = {};
