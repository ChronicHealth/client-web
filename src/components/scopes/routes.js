// @flow
import * as React from 'react';
import { Route } from 'react-router';
import ShowAll from './ShowAll';
import Create from './Create';
import Show from './Show';
import Edit from './Edit';
import IssuesShowAll from 'components/issues/ShowAll/Scopes';

export default [
  <Route exact key="ShowAll" path="/scopes" component={ShowAll} />,
  <Route exact key="Create" path="/scopes/create" component={Create} />,
  <Route exact key="Edit" path="/scopes/:scopeId/edit" component={Edit} />,
  <Route
    exact
    key="IssuesShowAll"
    path="/scopes/:scopeId/issues"
    component={IssuesShowAll}
  />,
  <Route exact key="Show" path="/scopes/:scopeId" component={Show} />
];
