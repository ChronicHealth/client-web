// @flow
import React from 'react';
import { flowRight } from 'lodash';
import ULItem from 'ui-kit/UL/Item';
import UL from 'ui-kit/UL';
import getPrescriptionResult from '../get';
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

export class ShowPrescriptionResult extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>{props.prescriptionResult.name}</h1>
        <ShowText title="Notes" value={props.prescriptionResult.notes} />
        <ShowText
          title="Instructives / Amounts"
          value={props.prescriptionResult.instructives}
        />
        <ShowText title="Scope" value={props.prescriptionResult.scope} />
        <ShowMulti title="References" values={props.prescriptionResult.refs} />
      </div>
    );
  }
}

export default flowRight([getPrescriptionResult])(ShowPrescriptionResult);
