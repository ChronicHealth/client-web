// @flow
import React from 'react';
import { flowRight } from 'lodash';
import ULItem from 'ui-kit/UL/Item';
import UL from 'ui-kit/UL';
import get from '../get';

type $props = Object;

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

export class ShowTest extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>{props.test.name}</h1>
        <ShowText title="Notes" value={props.test.notes} />
        <ShowText
          title="Instructives / Amounts"
          value={props.test.instructives}
        />
        <ShowText title="Scope" value={props.test.scope} />
        <ShowMulti title="References" values={props.test.refs} />
      </div>
    );
  }
}

export default flowRight([get.connect, get.khange])(ShowTest);
