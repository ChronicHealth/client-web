// @flow
import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import reducers from './reducers';
export const history = createHistory();

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(reduxThunk, routerMiddleware(history))
);

export default createStore(reducers, enhancer);
