// @flow

import React from 'react';
import { Tab, Tabs } from 'ui-kit';
import Prescriptions from 'components/prescriptions/ShowAll';
import PrescriptionGroups from 'components/prescriptionGroups/ShowAll';
import Tests from 'components/tests/ShowAll';
import Routines from 'components/routines/ShowAll';
type $props = Object;

export default class Home extends React.PureComponent<$props> {
  render() {
    return (
      <div>
        <Tabs>
          <Tab label="Prescriptions">
            <Prescriptions />
          </Tab>
          <Tab label="Prescription Groups">
            <PrescriptionGroups />
          </Tab>
          <Tab label="Tests">
            <Tests />
          </Tab>
          <Tab label="Routines">
            <Routines />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
