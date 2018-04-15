// @flow
import * as React from 'react';
import { Route } from 'react-router';
import ShowAll from './ShowAll';
import Create from './Create';
import Show from './Show';
import Edit from './Edit';
import IssuesShowAll from 'components/issues/ShowAll/ClientRoutines';

export default [
  <Route exact key="ShowAll" path="/client_routines" component={ShowAll} />,
  <Route
    exact
    key="Create"
    path="/client_routines/create"
    component={Create}
  />,
  <Route
    exact
    key="Edit"
    path="/client_routines/:clientRoutineId/edit"
    component={Edit}
  />,
  <Route
    exact
    key="IssuesShowAll"
    path="/client_routines/:clientRoutineId/issues"
    component={IssuesShowAll}
  />,
  <Route
    exact
    key="Show"
    path="/client_routines/:clientRoutineId"
    component={Show}
  />
];
