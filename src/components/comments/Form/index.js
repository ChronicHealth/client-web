// @flow
import * as React from 'react';
import { TextInput } from 'ui-kit';
type $ownProps = Object;

type $props = $ownProps;

export default class CommentForm extends React.PureComponent<$props> {
  render() {
    const { fields } = this.props;
    return (
      <React.Fragment>
        <TextInput {...fields.content} />
      </React.Fragment>
    );
  }
}
