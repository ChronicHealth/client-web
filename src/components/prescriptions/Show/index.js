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

export class ShowPrescription extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>{props.prescription.name}</h1>
        <ShowMulti title="Purpose" values={props.prescription.purpose} />
        <ShowText title="Notes" value={props.prescription.notes} />
        <ShowText
          title="Instructives / Amounts"
          value={props.prescription.instructives}
        />
        <ShowText title="Scope" value={props.prescription.scope} />
        <ShowMulti title="References" values={props.prescription.refs} />
      </div>
    );
  }
}

export default flowRight([get])(ShowPrescription);
