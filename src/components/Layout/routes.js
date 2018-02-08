//@flow
import React from 'react'
import { Switch, Route } from 'react-router'
import PrescriptionShowAll from 'components/prescriptions/ShowAll'
import PrescriptionCreate from 'components/prescriptions/Create'
import UsersCreate from 'components/users/Create'

export default [
  <Switch key="switch">
    <Route exact path="/prescriptions" component={PrescriptionShowAll}/>
    <Route exact path="/prescriptions/create" component={PrescriptionCreate}/>
    <Route exact path="/signup" component={UsersCreate}/>
  </Switch>
]