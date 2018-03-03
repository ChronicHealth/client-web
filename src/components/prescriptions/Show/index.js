// @flow
import React from 'react';
import { flowRight } from 'lodash';
import ULItem from 'ui-kit/UL/Item';
import UL from 'ui-kit/UL';
import IssuesButton from 'components/issues/Button';
import { types } from '@client/models/Issue';
import get from '../get';
import PrescriptionScope from '../../scopes/Prescription';

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
    if (!props.values.size) {
      return null;
    }
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

class ShowScopes extends React.PureComponent<Object> {
  render() {
    const { props } = this;
    if (!props.values.size) {
      return null;
    }
    return (
      <div>
        <h3>{props.title}</h3>
        <UL>
          {props.values.map((scope, i) => {
            return <PrescriptionScope key={i} scope={scope} />;
          })}
        </UL>
      </div>
    );
  }
}

export class ShowPrescription extends React.PureComponent<$props> {
  render() {
    const { prescription, ...props } = this.props;
    return (
      <div>
        <h1>{prescription.name}</h1>
        <ShowText title="Synopsis" value={prescription.notes} />
        <ShowScopes title="Scopes" values={prescription.scopes} />
        <ShowMulti title="Effects" values={prescription.effects} />
        <ShowMulti title="References" values={prescription.refs} />
        <IssuesButton id={props.id} type={types.PRESCRIPTION} />
      </div>
    );
  }
}

export default flowRight([get])(ShowPrescription);
