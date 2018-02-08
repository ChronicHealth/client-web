import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { enableRetyping } from 'redux-retype-actions';
import composeHors from 'redux-compose-hors';
import reduxThunk from 'redux-thunk';

import { routerMiddleware, routerReducer } from 'react-router-redux';
// import reducers from '@client/reducers';
import createHistory from 'history/createBrowserHistory'



export const history = createHistory()



const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(reduxThunk, routerMiddleware(history))
);

const allReducers = combineReducers({
  // ...reducers,
  routing: routerReducer,
});

export default createStore(
  composeHors(allReducers, enableBatching, enableRetyping),
  enhancer
);
