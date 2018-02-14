// @flow
import * as React from 'react';
import { ULItem } from 'ui-kit';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import * as prescriptionSelectors from '@client/selectors/prescriptions';
import { goToEditPrescription } from '@client/actions/prescriptions';
import { bindActionCreators } from 'redux';

type $props = Object;

export class PrescriptionItem extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <ULItem
        onClick={props.goToEditPrescription}
        caption={props.prescription.name}
      />
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  prescription: prescriptionSelectors.find()
});

export const mapDispatchToProps = (dispatch: $$dispatch, props: $props) =>
  bindActionCreators(
    {
      goToEditPrescription: () => goToEditPrescription(props.id)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionItem);
