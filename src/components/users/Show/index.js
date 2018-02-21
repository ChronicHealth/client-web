// @flow
import * as React from 'react';
import { flowRight } from 'lodash';
import { Card, CardText } from 'ui-kit';
type $props = Object;

export class UserShow extends React.PureComponent<$props> {
  render() {
    const { user, ...props } = this.props;
    return (
      <Card>
        <CardText>
          <h1>{user.username}</h1>
          <p>{user.blurb}</p>
          <p>{user.location}</p>
          <p>{user.description}</p>
        </CardText>
      </Card>
    );
  }
}

export default flowRight([])(UserShow);
