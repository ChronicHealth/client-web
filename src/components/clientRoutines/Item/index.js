// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ULItem } from 'ui-kit';
import Prescription from '@client/models/Prescription';
import ClientRoutine from '@client/models/ClientRoutine';
import { update } from '@client/actions/clientRoutines';
import { find, findRelated } from '@client/selectors/clientRoutines';
import * as prescriptionSelectors from '@client/selectors/prescriptions';
type $stateProps = { clientRoutine: ClientRoutine, prescription: Prescription };
type $ownProps = { id: $$id };
type $dispatchProps = { updateClientRoutine: Function };
type $props = $stateProps & $dispatchProps & $ownProps;
export class ClientRoutineItem extends React.PureComponent<$props> {
  toggleActive = () => {
    this.props.updateClientRoutine({
      active: !this.props.clientRoutine
    });
  };
  render() {
    const { prescription } = this.props;
    return <ULItem onClick={this.toggleActive} caption={prescription.name} />;
  }
}

const getPrescriptionId = findRelated('prescription');

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  clientRoutine: find(),
  prescription: prescriptionSelectors.find(getPrescriptionId)
});

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      updateClientRoutine: update
    },
    dispatch
  );

export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  ClientRoutineItem
);
