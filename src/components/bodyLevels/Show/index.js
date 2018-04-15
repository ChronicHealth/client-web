// @flow
import React from 'react';
import { flowRight } from 'lodash';
import ULItem from 'ui-kit/UL/Item';
import UL from 'ui-kit/UL';
import getBodyLevel from '../get';
import type { $stateProps as $getStateProps } from '../get';
import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { List } from 'immutable';
import Prescription from '../../../@client/models/pages/Prescription';
import { findEntity } from '@client/selectors/prescriptions';
import BodyLevelScope from 'components/scopes/BodyLevel';
type $stateProps = {
  prescriptions: List<Prescription>
};

type $props = $getStateProps & $stateProps;

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
            return <BodyLevelScope key={i} scope={scope} />;
          })}
        </UL>
      </div>
    );
  }
}

export class ShowBodyLevel extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>{props.bodyLevel.name}</h1>
        <ShowText title="Notes" value={props.bodyLevel.notes} />
        <ShowScopes title="Scopes" values={props.bodyLevel.scopes} />
        <ShowMulti title="Prescriptions" values={props.prescriptions} />
        <ShowMulti title="References" values={props.bodyLevel.refs} />
      </div>
    );
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  prescriptions: createSelector(
    [(state, props) => props.bodyLevel.prescriptions, findEntity()],
    (prescriptionIds, prescriptionData) =>
      prescriptionIds.map(id => prescriptionData.getIn([id, 'name']))
  )
});

export default flowRight([getBodyLevel, connect(mapStateToProps)])(
  ShowBodyLevel
);
