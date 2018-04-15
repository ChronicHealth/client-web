// @flow

import React from 'react';
import { Tab, Tabs } from 'ui-kit';
import Prescriptions from 'components/prescriptions/ShowAll';
import BodyLevels from 'components/bodyLevels/ShowAll';
import Tests from 'components/tests/ShowAll';
import Effects from 'components/effects/ShowAll';
import Routine from 'components/routines/Show';
import Scopes from 'components/scopes/ShowAll';

type $props = Object;

export default class Home extends React.PureComponent<$props> {
  render() {
    return (
      <div>
        <Tabs>
          <Tab label="Actions">
            <Prescriptions />
          </Tab>
          <Tab label="Biomarkers">
            <BodyLevels />
          </Tab>
          <Tab label="Tests">
            <Tests />
          </Tab>
          <Tab label="Effects">
            <Effects />
          </Tab>
          <Tab label="Scopes">
            <Scopes />
          </Tab>
          <Tab label="Routine">
            <Routine home />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
