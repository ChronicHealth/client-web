//@flow
import React from 'react';
import { Switch, Route } from 'react-router';

import PrescriptionMy from 'components/prescriptions/My';
import PrescriptionShowAll from 'components/prescriptions/ShowAll';
import PrescriptionCreate from 'components/prescriptions/Create';
import PrescriptionShow from 'components/prescriptions/Show';
import PrescriptionEdit from 'components/prescriptions/Edit';

import PrescriptionGroupShowAll from 'components/prescriptionGroups/ShowAll';
import PrescriptionGroupCreate from 'components/prescriptionGroups/Create';
import PrescriptionGroupShow from 'components/prescriptionGroups/Show';
import PrescriptionGroupEdit from 'components/prescriptionGroups/Edit';

import TestMy from 'components/tests/My';
import TestShowAll from 'components/tests/ShowAll';
import TestCreate from 'components/tests/Create';
import TestShow from 'components/tests/Show';
import TestEdit from 'components/tests/Edit';

import RoutineMy from 'components/routines/My';
import RoutineShowAll from 'components/routines/ShowAll';
import RoutineCreate from 'components/routines/Create';
import RoutineShow from 'components/routines/Show';
import RoutineEdit from 'components/routines/Edit';

import UsersCreate from 'components/users/Create';
import UsersShowEditContainer from 'components/users/ShowEditContainer';

import IssuesEdit from 'components/issues/Edit';
import IssuesCreate from 'components/issues/Create';

import IssuesShowAllPrescriptionGroups from 'components/issues/ShowAll/PrescriptionGroups';
import IssuesShowAllPrescriptions from 'components/issues/ShowAll/Prescriptions';
import IssuesShowAllRoutines from 'components/issues/ShowAll/Routines';
import IssuesShowAllTests from 'components/issues/ShowAll/Tests';
import IssuesShow from 'components/issues/Show';

import ClientsShowAll from 'components/clients/ShowAll';
import ClientsCreate from 'components/clients/Create';
import ClientsShow from 'components/clients/Show';

import SessionsCreate from 'components/pages/sessions/Create';
import Home from 'components/pages/Home';

import bodyLevels from 'components/bodyLevels/routes';
import effects from 'components/effects/routes';
import scopes from 'components/scopes/routes';

export default [
  <Switch key="switch">
    {bodyLevels}
    {effects}
    {scopes}
    <Route exact path="/clients" component={ClientsShowAll} />
    <Route exact path="/clients/create" component={ClientsCreate} />
    <Route exact path="/clients/:clientId" component={ClientsShow} />

    <Route exact path="/prescriptions" component={PrescriptionShowAll} />
    <Route exact path="/prescriptions/my" component={PrescriptionMy} />
    <Route exact path="/prescriptions/create" component={PrescriptionCreate} />
    <Route
      exact
      path="/prescriptions/:prescriptionId/edit"
      component={PrescriptionEdit}
    />
    <Route
      exact
      path="/prescriptions/:prescriptionId/issues"
      component={IssuesShowAllPrescriptions}
    />
    <Route
      exact
      path="/prescriptions/:prescriptionId"
      component={PrescriptionShow}
    />

    <Route
      exact
      path="/prescription_groups"
      component={PrescriptionGroupShowAll}
    />
    <Route
      exact
      path="/prescription_groups/create"
      component={PrescriptionGroupCreate}
    />
    <Route
      exact
      path="/prescription_groups/:prescriptionGroupId/edit"
      component={PrescriptionGroupEdit}
    />
    <Route
      exact
      path="/prescription_groups/:prescriptionGroupId/issues"
      component={IssuesShowAllPrescriptionGroups}
    />
    <Route
      exact
      path="/prescription_groups/:prescriptionGroupId"
      component={PrescriptionGroupShow}
    />

    <Route exact path="/tests" component={TestShowAll} />
    <Route exact path="/tests/my" component={TestMy} />
    <Route exact path="/tests/create" component={TestCreate} />
    <Route exact path="/tests/:testId/edit" component={TestEdit} />
    <Route exact path="/tests/:testId/issues" component={IssuesShowAllTests} />

    <Route exact path="/tests/:testId" component={TestShow} />
    <Route exact path="/routines" component={RoutineShowAll} />
    <Route exact path="/routines/my" component={RoutineMy} />
    <Route exact path="/routines/create" component={RoutineCreate} />
    <Route exact path="/routines/:routineId/edit" component={RoutineEdit} />
    <Route
      exact
      path="/routines/:routineId/issues"
      component={IssuesShowAllRoutines}
    />
    <Route exact path="/routines/:routineId" component={RoutineShow} />
    <Route exact path="/issues/:issueId" component={IssuesShow} />
    <Route exact path="/issues/:issueId/edit" component={IssuesEdit} />
    <Route exact path="/issues/:type/create/:id" component={IssuesCreate} />

    <Route exact path="/users/:userId" component={UsersShowEditContainer} />
    <Route exact path="/signup" component={UsersCreate} />
    <Route exact path="/login" component={SessionsCreate} />
    <Route exact path="/" component={Home} />
  </Switch>
];
