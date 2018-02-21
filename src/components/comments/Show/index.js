// @flow
import * as React from 'react';
import { Button } from 'ui-kit';

type $props = {
  comment: Object,
  toggleEditing: Function
};
export default class ShowComment extends React.PureComponent<$props> {
  render() {
    const { comment } = this.props;
    return (
      <div>
        <p>{comment.content}</p>
        <Button onClick={this.props.toggleEditing}>Edit</Button>
      </div>
    );
  }
}
