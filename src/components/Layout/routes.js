//@flow
import React from 'react';
import { Switch, Route } from 'react-router';
import PrescriptionShowAll from 'components/prescriptions/ShowAll';
import PrescriptionCreate from 'components/prescriptions/Create';
import PrescriptionShow from 'components/prescriptions/Show';
import UsersCreate from 'components/users/Create';
import SessionsCreate from 'components/pages/sessions/Create';

export default [
  <Switch key="switch">
    <Route exact path="/prescriptions" component={PrescriptionShowAll} />
    <Route exact path="/prescriptions/create" component={PrescriptionCreate} />
    <Route
      exact
      path="/prescriptions/:prescriptionId"
      component={PrescriptionShow}
    />
    <Route exact path="/signup" component={UsersCreate} />
    <Route exact path="/login" component={SessionsCreate} />
  </Switch>
];
