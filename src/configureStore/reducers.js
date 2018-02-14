// @flow
import { combineReducers } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { enableRetyping } from 'redux-retype-actions';
import composeHors from 'redux-compose-hors';
import { fakeReducer, enableNoredux } from 'redux-noredux';
import { routerReducer } from 'react-router-redux';
import { initialState } from '@client/reducers/er';

const allReducers = combineReducers({
  er: fakeReducer(initialState),
  routing: routerReducer
});

export default composeHors(
  allReducers,
  enableBatching,
  enableRetyping,
  enableNoredux
);
