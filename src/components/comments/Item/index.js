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

const mapStateToProps = createStructuredSelector({
  comment: find(),
  canEdit: createSelector(
    [find(), currentUserId],
    (comment, currentUserId) => comment.userId === currentUserId
  )
});

export default flowRight([connect(mapStateToProps)])(CommentItem);
