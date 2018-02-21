// @flow
import * as React from 'react';
import CommentItem from 'components/comments/Item';
import getIssue from '../get';
import { flowRight } from '@client/utils/components';
import CreateComment from 'components/comments/Create';
import { Button } from 'ui-kit';

type $props = Object;

export class IssueShow extends React.PureComponent<$props, Object> {
  state = {
    createComment: false
  };
  toggleCreateComment = () => {
    this.setState({
      createComment: !this.state.createComment
    });
  };
  render() {
    const { issue, commentIds } = this.props;
    return (
      <div>
        <h1>{issue.title}</h1>
        <p>{issue.content}</p>
        {commentIds.map(id => <CommentItem id={id} key={id} />)}

        {this.state.createComment ? (
          <CreateComment
            toggleCreateComment={this.toggleCreateComment}
            issueId={issue.id}
          />
        ) : (
          <Button onClick={this.toggleCreateComment}>Create Comment</Button>
        )}
      </div>
    );
  }
}

export default flowRight([getIssue])(IssueShow);
