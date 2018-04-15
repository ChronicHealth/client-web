// @flow
import React from 'react';
import { flowRight } from 'lodash';
import ULItem from 'ui-kit/UL/Item';
import UL from 'ui-kit/UL';
import getEffect from '../get';
import type { $stateProps } from '../get';

type $props = $stateProps;

class ShowText extends React.PureComponent<Object> {
  render() {
    const { props } = this;
    return (
      <div>
        <h3>{props.title}</h3>
        <p>{props.value}</p>
      </div>
    );
  }
}

class ShowMulti extends React.PureComponent<Object> {
  render() {
    const { props } = this;
    return (
      <div>
        <h3>{props.title}</h3>
        <UL>
          {props.values.map((value, i) => {
            return <ULItem key={i} caption={value} />;
          })}
        </UL>
      </div>
    );
  }
}

export class ShowEffect extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>{props.effect.name}</h1>
        <ShowText title="Description" value={props.effect.description} />
        <ShowMulti title="References" values={props.effect.refs} />
      </div>
    );
  }
}

export default flowRight([getEffect])(ShowEffect);
