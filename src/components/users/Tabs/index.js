// @flow
import * as React from 'react';
import { Tabs, Tab } from 'ui-kit';
import MyPrescriptions from 'components/prescriptions/My';
import MyTests from 'components/tests/My';
import MyRoutines from 'components/routines/My';

type $props = Object;

export default class UserTabs extends React.PureComponent<$props> {
  render() {
    const { canEdit } = this.props;
    return (
      <Tabs fixed>
        <Tab label="Prescriptions">
          <MyPrescriptions canEdit={canEdit} />
        </Tab>
        <Tab label="Tests">
          <MyTests canEdit={canEdit} />
        </Tab>
        <Tab label="Routines">
          <MyRoutines canEdit={canEdit} />
        </Tab>
      </Tabs>
    );
  }
}
