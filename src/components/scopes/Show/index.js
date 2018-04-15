// @flow
import React from 'react';
import { flowRight } from 'lodash';
import ShowReferences from 'components/references/ShowAll';
import getScope from '../get';
import type { $stateProps } from '../get';

type $props = $stateProps;

export class ShowScope extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>{props.scope.name}</h1>
        <p>{props.scope.description}</p>
        <ShowReferences references={props.scope.refs} />
      </div>
    );
  }
}

export default flowRight([getScope])(ShowScope);
