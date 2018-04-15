// @flow
import React from 'react';
import { UL } from 'ui-kit';
import { flowRight } from 'lodash';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { getPrescriptionResults } from '@client/actions/pages/homes';
import { bindActionCreators } from '@client/utils/components';
import { createStructuredSelector } from 'reselect';
import { getRelated } from '@client/selectors/pages/homes';
import PrescriptionResultItem from '../Item';

type $stateProps = {
  prescriptionResultIds: List<$$id>
};
type $dispatchProps = {
  getPrescriptionResults: Function
};
type $ownProps = {};

type $props = $stateProps & $dispatchProps & $ownProps;

export class ShowAllPrescriptionResults extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getPrescriptionResults();
  }
  render() {
    return (
      <div>
        <UL>
          {this.props.prescriptionResultIds.map(id => {
            return <PrescriptionResultItem key={id} id={id} />;
          })}
        </UL>
      </div>
    );
  }
}

export const mapDispatchToProps = (
  dispatch: $$dispatch
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      getPrescriptionResults
    },
    dispatch
  );

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  prescriptionResultIds: getRelated('prescriptionResults')
});
export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  ShowAllPrescriptionResults
);
