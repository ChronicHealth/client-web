// @flow
import * as React from 'react';
import { Tabs, Tab } from '../../../ui-kit';
import ClientGeneral from '../General';
import ClientPrescriptions from '../Prescriptions';
import ClientTests from '../Tests';

export default class ClientsShow extends React.PureComponent<*> {
  render() {
    return (
      <div>
        <Tabs fixed>
          <Tab label="General">
            <ClientGeneral {...this.props} />
          </Tab>
          <Tab label="Actions">
            <ClientPrescriptions {...this.props} />
          </Tab>
          <Tab label="Tests">
            <ClientTests {...this.props} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
