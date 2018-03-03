// @flow
import * as React from 'react';
import { Tabs, Tab } from 'ui-kit';
import MyPrescriptions from 'components/prescriptions/My';
import MyPrescriptionGroups from 'components/prescriptionGroups/My';
import MyTests from 'components/tests/My';
import MyRoutines from 'components/routines/My';

type $props = Object;

export default class UserTabs extends React.PureComponent<$props> {
  render() {
    const { canEdit, userId } = this.props;
    return (
      <Tabs fixed>
        <Tab label="Prescriptions">
          <MyPrescriptions userId={userId} canEdit={canEdit} />
        </Tab>
        <Tab label="Prescription Groups">
          <MyPrescriptionGroups userId={userId} canEdit={canEdit} />
        </Tab>
        <Tab label="Tests">
          <MyTests userId={userId} canEdit={canEdit} />
        </Tab>
        <Tab label="Routines">
          <MyRoutines userId={userId} canEdit={canEdit} />
        </Tab>
      </Tabs>
    );
  }
}
