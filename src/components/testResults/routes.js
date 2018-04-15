// @flow
import * as React from 'react';
import { Route } from 'react-router';
import ShowAll from './ShowAll';
import Create from './Create';
import Show from './Show';
import Edit from './Edit';
import IssuesShowAll from 'components/issues/ShowAll/TestResults';

export default [
  <Route exact key="ShowAll" path="/test_results" component={ShowAll} />,
  <Route exact key="Create" path="/test_results/create" component={Create} />,
  <Route
    exact
    key="Edit"
    path="/test_results/:testResultId/edit"
    component={Edit}
  />,
  <Route
    exact
    key="IssuesShowAll"
    path="/test_results/:testResultId/issues"
    component={IssuesShowAll}
  />,
  <Route exact key="Show" path="/test_results/:testResultId" component={Show} />
];
