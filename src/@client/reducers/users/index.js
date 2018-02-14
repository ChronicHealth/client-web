// @flow
import User from '@client/models/User';
import usersSchema from '@client/schemas/users';
import {
  entityReducer,
  relationshipReducer,
  getValueFunc
} from '@client/utils/reducers';

export const relationship = {
  ...relationshipReducer('users', getValueFunc(usersSchema))
};

export const entity = {
  ...entityReducer('users', ent => new User(ent))
};

export const initialState = {};
