// @flow
import React from 'react';
import khange, { kheck } from 'khange';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { getParam } from '@client/selectors/router';
import * as prescriptionSelectors from '@client/selectors/prescriptions';
import ULItem from 'ui-kit/UL/Item';
import UL from 'ui-kit/UL';
import { get } from '@client/actions/prescriptions';
import { bindActionCreators } from 'redux';

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

const getPrescriptionId = getParam('prescriptionId');

export const mapStateToProps = createStructuredSelector({
  id: getPrescriptionId,
  prescription: prescriptionSelectors.find(getPrescriptionId)
});

// $FlowFixMe
export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      get
    },
    dispatch
  );

export const onKhange = (props: $props) => {
  props.get(props.id);
};

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('id'), onKhange)
])(ShowPrescription);
