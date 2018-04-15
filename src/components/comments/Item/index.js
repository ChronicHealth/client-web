// @flow

import React from 'react';
import { flowRight } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { find } from '@client/selectors/comments';
import { currentUserId } from '@client/selectors/users';
import ShowComment from '../Show';
import EditComment from '../Edit';
import { createSelector } from 'reselect';
type $props = Object;
type $state = Object;

export class CommentItem extends React.PureComponent<$props, $state> {
  state = {
    isEditing: false
  };
  toggleEditing = () => {
    this.setState({
      isEditing: !this.state.isEditing
    });
  };
  render() {
    console.log('here?');
    return (
      <div>
        {this.state.isEditing ? (
          <EditComment toggleFinished={this.toggleEditing} {...this.props} />
        ) : (
          <ShowComment
            canEdit={this.props.canEdit}
            toggleEditing={this.toggleEditing}
            {...this.props}
          />
        )}
      </div>
    );
  }
}

const getUserId = createSelector([find()], comment => comment.userId);

const mapStateToProps = createStructuredSelector({
  comment: find(),
  canEdit: createSelector(
    [getUserId, currentUserId],
    (commentUserId, currentUserId) => commentUserId === currentUserId
  ),
  userId: getUserId
});

export default flowRight([connect(mapStateToProps)])(CommentItem);
