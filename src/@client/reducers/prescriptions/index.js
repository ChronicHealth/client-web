// @flow
import Model from '@client/models/Prescription';
import prescriptionsSchema from '@client/schemas/prescriptions';
import {
  entityReducer,
  relationshipReducer,
  getValueFunc
} from '@client/utils/reducers';

export const relationship = {
  ...relationshipReducer('prescriptions', getValueFunc(prescriptionsSchema))
};

export const entity = {
  ...entityReducer('prescriptions', ent => new Model(ent))
};

export const initialState = {};
