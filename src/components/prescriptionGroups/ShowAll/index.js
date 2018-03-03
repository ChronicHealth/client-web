// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UL } from 'ui-kit';
import { getPrescriptionGroups } from '@client/actions/pages/homes';
import PrescriptionGroupItem from 'components/prescriptionGroups/Item';
import { List } from 'immutable';
import { getRelated } from '@client/selectors/pages/homes';

type $stateProps = {
  prescriptionGroupIds: List<$$id>
};
type $ownProps = {};
type $dispatchProps = { getPrescriptionGroups: Function };
type $props = $stateProps & $dispatchProps & $ownProps;
export class PrescriptionGroupsShowAll extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getPrescriptionGroups();
  }
  render() {
    const props = this.props;
    return (
      <UL>
        {props.prescriptionGroupIds.map(id => (
          <PrescriptionGroupItem id={id} key={id} />
        ))}
      </UL>
    );
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  prescriptionGroupIds: getRelated('prescriptionGroups')
});

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      getPrescriptionGroups
    },
    dispatch
  );

export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  PrescriptionGroupsShowAll
);
