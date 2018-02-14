// @flow
import React from 'react';
import { UL, ULItem } from 'ui-kit';
import { flowRight } from 'lodash';
import { push } from '@client/actions/router';
import { connect } from 'react-redux';
import { getPrescriptions } from '@client/actions/pages/myPrescriptions';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as pagePrescriptionSelectors from '@client/selectors/pages/prescriptions';
import PrescriptionItem from '../Item';

type $props = Object;

export class MyPrescriptions extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getPrescriptions();
  }
  render() {
    return (
      <div>
        <h1>Prescriptions</h1>
        <UL>
          <ULItem
            onClick={this.props.goToCreatePrescription}
            selectable
            caption="Create Prescription"
            leftIcon="add"
          />
          {this.props.prescriptionIds.map(id => {
            return <PrescriptionItem key={id} id={id} />;
          })}
        </UL>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      goToCreatePrescription: () => push('/prescriptions/create'),
      getPrescriptions
    },
    dispatch
  );

export const mapStateToProps = createStructuredSelector({
  prescriptionIds: pagePrescriptionSelectors.getRelated('prescriptions')
});
export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  MyPrescriptions
);
