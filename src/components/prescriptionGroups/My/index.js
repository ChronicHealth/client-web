// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UL, ULItem } from 'ui-kit';
import { getRelated } from '@client/selectors/users';
import PrescriptionGroupItem from '../Item';
import { List } from 'immutable';
import { getPrescriptionGroups } from '@client/actions/users';
import { push } from '@client/actions/router';

type $stateProps = {
  prescriptionGroupIds: List<$$id>
};
type $ownProps = {
  userId: $$id
};
type $dispatchProps = {
  goToCreatePrescriptionGroup: Function,
  getPrescriptionGroups: Function
};
type $props = $stateProps & $dispatchProps & $ownProps;
export class PrescriptionGroupsMy extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getPrescriptionGroups(this.props.userId);
  }
  render() {
    const props = this.props;
    return (
      <UL>
        <ULItem
          leftIcon="add"
          caption="Create Prescription Group"
          onClick={props.goToCreatePrescriptionGroup}
        />
        {props.prescriptionGroupIds.map(id => (
          <PrescriptionGroupItem canEdit id={id} key={id} />
        ))}
      </UL>
    );
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  prescriptionGroupIds: getRelated(
    'prescriptionGroups',
    (state, props) => props.userId
  )
});

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      goToCreatePrescriptionGroup: () => push('/prescription_groups/create'),
      getPrescriptionGroups
    },
    dispatch
  );

export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  PrescriptionGroupsMy
);
