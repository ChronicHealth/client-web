// @flow
import * as React from 'react';
import { Route } from 'react-router';
import ShowAll from './ShowAll';
import Create from './Create';
import Show from './Show';
import Edit from './Edit';
import IssuesShowAll from 'components/issues/ShowAll/Effects';

export default [
  <Route exact key="ShowAll" path="/effects" component={ShowAll} />,
  <Route exact key="Create" path="/effects/create" component={Create} />,
  <Route exact key="Edit" path="/effects/:effectId/edit" component={Edit} />,
  <Route
    exact
    key="IssuesShowAll"
    path="/effects/:effectId/issues"
    component={IssuesShowAll}
  />,
  <Route exact key="Show" path="/effects/:effectId" component={Show} />
];
