// @flow
import * as React from 'react';
import { Button } from 'ui-kit';

type $props = {
  comment: Object,
  toggleEditing: Function,
  canEdit: boolean
};
export default class ShowComment extends React.PureComponent<$props> {
  render() {
    const { comment, canEdit } = this.props;
    return (
      <div>
        <p>{comment.content}</p>
        {canEdit && <Button onClick={this.props.toggleEditing}>Edit</Button>}
      </div>
    );
  }
}
