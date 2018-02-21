// @flow
import React from 'react';
import { flowRight } from 'lodash';
import ULItem from 'ui-kit/UL/Item';
import UL from 'ui-kit/UL';
import getRoutine from '../get';

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

export class ShowRoutine extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>{props.routine.name}</h1>
        <ShowText title="Description" value={props.routine.description} />
        <ShowMulti
          title="Prescriptions"
          values={props.prescriptions.map(p => p.name)}
        />
        <ShowMulti title="Tests" values={props.tests.map(p => p.name)} />
      </div>
    );
  }
}

export default flowRight([getRoutine])(ShowRoutine);
