// @flow
import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import Layout from 'components/Layout';
import store, {history} from './configureStore'
import { Route } from 'react-router'
import 'ui-kit/materialDesignIcons.css'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route path="/" component={Layout} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}