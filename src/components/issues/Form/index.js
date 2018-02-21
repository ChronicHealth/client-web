// @flow
import * as React from 'react';
import { TextInput } from 'ui-kit';

type $props = Object;

export class IssueShow extends React.PureComponent<$props> {
  render() {
    const { fields } = this.props;
    return (
      <React.Fragment>
        <TextInput {...fields.title} />
        <TextInput multiline rows={10} {...fields.content} />
      </React.Fragment>
    );
  }
}

export default IssueShow;
