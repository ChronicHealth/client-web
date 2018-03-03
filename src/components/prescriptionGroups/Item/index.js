// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ULItem } from 'ui-kit';
import PrescriptionGroup from '@client/models/PrescriptionGroup';
import { find } from '@client/selectors/prescriptionGroups';
import {
  goToPrescriptionGroup,
  goToEditPrescriptionGroup
} from '@client/actions/prescriptionGroups';

type $stateProps = {
  prescriptionGroup: PrescriptionGroup
};
type $ownProps = {
  id: $$id
};
type $dispatchProps = {
  goToPrescriptionGroup: Function
};
type $props = $stateProps & $dispatchProps & $ownProps;

export class PrescriptionGroupItem extends React.PureComponent<$props> {
  render() {
    const { ...props } = this.props;
    return (
      <ULItem
        onClick={
          props.canEdit
            ? props.goToEditPrescriptionGroup
            : props.goToPrescriptionGroup
        }
        caption={props.prescriptionGroup.name}
      />
    );
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  prescriptionGroup: find()
});

const mapDispatchToProps = (
  dispatch: $$dispatch,
  props: $ownProps
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      goToPrescriptionGroup: () => goToPrescriptionGroup(props.id),
      goToEditPrescriptionGroup: () => goToEditPrescriptionGroup(props.id)
    },
    dispatch
  );

export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  PrescriptionGroupItem
);
