// @flow
import React from 'react';
import { UL } from 'ui-kit';
import { flowRight } from 'lodash';
import { connect } from 'react-redux';
import { getPrescriptions } from '@client/actions/pages/prescriptions';
import { bindActionCreators } from '@client/utils/components';
import { createStructuredSelector } from 'reselect';
import * as pagePrescriptionSelectors from '@client/selectors/pages/prescriptions';
import PrescriptionItem from '../Item';
import Instructions from 'components/general/Instructions';
type $props = Object;

export class ShowAllPrescriptions extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getPrescriptions();
  }
  render() {
    return (
      <div>
        <Instructions content="Actions are specific instructions people can follow to improve their health." />
        <UL>
          {this.props.prescriptionIds.map(id => {
            return <PrescriptionItem selectable key={id} id={id} />;
          })}
        </UL>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      getPrescriptions
    },
    dispatch
  );

export const mapStateToProps = createStructuredSelector({
  prescriptionIds: pagePrescriptionSelectors.getRelated('prescriptions')
});
export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  ShowAllPrescriptions
);
