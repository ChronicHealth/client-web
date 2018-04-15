// @flow
import * as React from 'react';
import { Route } from 'react-router';
import ShowAll from './ShowAll';
import Create from './Create';
import Show from './Show';
import Edit from './Edit';
import IssuesShowAll from 'components/issues/ShowAll/PrescriptionResults';

export default [
  <Route
    exact
    key="ShowAll"
    path="/prescription_results"
    component={ShowAll}
  />,
  <Route
    exact
    key="Create"
    path="/prescription_results/create"
    component={Create}
  />,
  <Route
    exact
    key="Edit"
    path="/prescription_results/:prescriptionResultId/edit"
    component={Edit}
  />,
  <Route
    exact
    key="IssuesShowAll"
    path="/prescription_results/:prescriptionResultId/issues"
    component={IssuesShowAll}
  />,
  <Route
    exact
    key="Show"
    path="/prescription_results/:prescriptionResultId"
    component={Show}
  />
];
