// @flow
import * as React from 'react';
import { flowRight } from 'lodash';
import ShowUser from '../Show';
import EditUser from '../Edit';
import { createStructuredSelector, createSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { get } from '@client/actions/users';
import { getParam } from '@client/selectors/router';
import { find, currentUserId } from '@client/selectors/users';
import khange, { kheck } from 'khange';
import { Row, Col } from 'ui-kit';
import UserTabs from '../Tabs';

type $props = Object;

export class UserShowEditContainer extends React.PureComponent<$props> {
  render() {
    const { isCurrentUser, ...props } = this.props;
    const Comp = isCurrentUser ? EditUser : ShowUser;
    return (
      <div>
        <Row>
          <Col xs={12} md={4}>
            <Comp {...props} />
          </Col>
          <Col xs={12} md={8}>
            <UserTabs canEdit={isCurrentUser} />
          </Col>
        </Row>
      </div>
    );
  }
}

const userId = getParam('userId');
const isCurrentUser = createSelector(
  [userId, currentUserId],
  (userId, sessionUserId) => {
    return userId === sessionUserId;
  }
);

const mapStateToProps = createStructuredSelector({
  id: userId,
  user: find(userId),
  isCurrentUser
});

const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      get
    },
    dispatch
  );

const onKhange = props => props.get(props.id);

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('id'), onKhange)
])(UserShowEditContainer);
