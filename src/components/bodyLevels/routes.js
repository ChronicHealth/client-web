// @flow
import * as React from 'react';
import { Route } from 'react-router';
import ShowAll from './ShowAll';
import Create from './Create';
import Show from './Show';
import Edit from './Edit';
import IssuesShowAll from 'components/issues/ShowAll/BodyLevels';

export default [
  <Route exact key="ShowAll" path="/body_levels" component={ShowAll} />,
  <Route exact key="Create" path="/body_levels/create" component={Create} />,
  <Route
    exact
    key="Edit"
    path="/body_levels/:bodyLevelId/edit"
    component={Edit}
  />,
  <Route
    exact
    key="IssuesShowAll"
    path="/body_levels/:bodyLevelId/issues"
    component={IssuesShowAll}
  />,
  <Route exact key="Show" path="/body_levels/:bodyLevelId" component={Show} />
];
