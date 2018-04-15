// @flow
import * as React from 'react';
import { ULItem } from 'ui-kit';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Prescription from '../../../@client/models/Prescription';
import * as prescriptionSelectors from '@client/selectors/prescriptions';
import {
  goToEditPrescription,
  goToPrescription
} from '@client/actions/prescriptions';
import { bindActionCreators } from '@client/utils/components';

type $ownProps = {
  id: $$id,
  canEdit?: boolean
};

type $stateProps = {
  prescription: Prescription
};

type $dispatchProps = {
  goToEditPrescription: Function,
  goToPrescription: Function
};

type $props = $ownProps & $stateProps & $dispatchProps;

export class PrescriptionItem extends React.PureComponent<$props> {
  render() {
    const {
      canEdit,
      goToEditPrescription,
      goToPrescription,
      prescription,
      ...props
    } = this.props;

    return (
      <ULItem
        {...props}
        onClick={canEdit ? goToEditPrescription : goToPrescription}
        caption={prescription.name}
      />
    );
  }
}

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  prescription: prescriptionSelectors.find()
});

export const mapDispatchToProps = (
  dispatch: $$dispatch,
  props: $props
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      goToEditPrescription: () => goToEditPrescription(props.id),
      goToPrescription: () => goToPrescription(props.id)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionItem);
