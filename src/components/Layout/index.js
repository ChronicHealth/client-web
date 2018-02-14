// @flow
import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Panel from 'react-toolbox/lib/layout/Panel';
import Sidebar from 'react-toolbox/lib/layout/Sidebar';
import Navigation from 'react-toolbox/lib/navigation';
import { Link } from 'ui-kit';
import Nav from './Nav';
import routes from './routes';
import styles from './style.pcss';
import { flowRight } from 'lodash';
import { connect } from 'react-redux';
import { mapDispatchToProps } from './connect';

type $props = {
  checkIfLoggedIn: Function,
  sidebarPinned: boolean
};

export class Layout extends React.Component<$props> {
  componentWillMount() {
    this.props.checkIfLoggedIn();
  }
  render() {
    return (
      <div>
        <AppBar title="Kronic" leftIcon="menu">
          <Navigation type="horizontal">
            <Link
              href={`${process.env.CLIENT_URL || ''}/prescriptions`}
              label="Prescriptions"
              icon="assignment"
            />
            <Link
              href={`${process.env.CLIENT_URL || ''}/tests`}
              label="Tests"
              icon="colorize"
            />
            <Link
              href={`${process.env.CLIENT_URL || ''}/routines`}
              label="Routines"
              icon="schedule"
            />
            <Nav />
          </Navigation>
        </AppBar>
        <Sidebar pinned={this.props.sidebarPinned} width={12}>
          {
            //<div><IconButton icon='close' onClick={ this.toggleSidebar }/></div>
          }
          <div style={{ flex: 1 }}>
            <p>Supplemental content goes here.</p>
          </div>
        </Sidebar>
        <Panel className={styles.container}>
          <div>{routes}</div>
        </Panel>
      </div>
    );
  }
}

export default flowRight([connect(null, mapDispatchToProps)])(Layout);
