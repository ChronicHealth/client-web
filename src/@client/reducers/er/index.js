// @flow
import { Map } from 'immutable';
import * as users from '../users';
import * as pages from '../pages';
import * as prescriptions from '../prescriptions';
const all = {
  users,
  pages,
  prescriptions
};

const splitReducers = allReducers => {
  return Object.keys(allReducers).reduce(
    (finalResult, reducerName) => {
      finalResult.entities[reducerName] = allReducers[reducerName].entity;
      finalResult.relationships[reducerName] =
        allReducers[reducerName].relationship;
      // $FlowFixMe
      finalResult.initialState.entities[reducerName] = new Map(
        allReducers[reducerName].initialState.entity
      );
      // $FlowFixMe
      finalResult.initialState.relationships[reducerName] = new Map(
        allReducers[reducerName].initialState.relationship
      );
      return finalResult;
    },
    {
      entities: {},
      relationships: {},
      initialState: {
        entities: {},
        relationships: {}
      }
    }
  );
};

module.exports = splitReducers(all);
