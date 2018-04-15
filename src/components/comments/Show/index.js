// @flow
import * as React from 'react';
import { Button } from 'ui-kit';
import UserChip from '../../users/Chip';

type $props = {
  comment: Object,
  toggleEditing: Function,
  canEdit: boolean,
  userId: $$id
};
export default class ShowComment extends React.PureComponent<$props> {
  render() {
    const { comment, canEdit, ...props } = this.props;
    console.log('id', props.userId);
    return (
      <div>
        <p>{comment.content}</p>
        <div>
          <UserChip id={props.userId} />
        </div>
        {canEdit && <Button onClick={this.props.toggleEditing}>Edit</Button>}
      </div>
    );
  }
}
