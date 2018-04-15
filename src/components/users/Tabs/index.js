// @flow
import * as React from 'react';
import { Tabs, Tab } from 'ui-kit';
import MyPrescriptions from 'components/prescriptions/My';
import MyBodyLevels from 'components/bodyLevels/My';
import MyTests from 'components/tests/My';
import MyEffects from 'components/effects/My';
import MyScopes from 'components/scopes/My';
import { flowRight } from 'lodash';
import { currentUser } from '@client/selectors/users';
import { connect } from 'react-redux';
import EditRoutine from '../../routines/Edit';
import { createStructuredSelector } from 'reselect';

type $props = Object;

export class UserTabs extends React.PureComponent<$props> {
  render() {
    const { canEdit, userId, ...props } = this.props;
    return (
      <Tabs fixed>
        <Tab label="Actions">
          <MyPrescriptions userId={userId} canEdit={canEdit} />
        </Tab>
        <Tab label="Biomarkers">
          <MyBodyLevels userId={userId} canEdit={canEdit} />
        </Tab>
        <Tab label="Tests">
          <MyTests userId={userId} canEdit={canEdit} />
        </Tab>
        <Tab label="Effects">
          <MyEffects userId={userId} canEdit={canEdit} />
        </Tab>
        <Tab label="Scopes">
          <MyScopes userId={userId} canEdit={canEdit} />
        </Tab>
        {props.currentUser.moderator && (
          <Tab label="Routine">
            <EditRoutine userId={userId} canEdit={canEdit} />
          </Tab>
        )}
      </Tabs>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser
});

export default flowRight([connect(mapStateToProps)])(UserTabs);
