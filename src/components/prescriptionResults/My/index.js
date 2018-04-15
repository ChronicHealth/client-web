// @flow
import React from 'react';
import { UL, ULItem } from 'ui-kit';
import { flowRight } from 'lodash';
import { push } from '@client/actions/router';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { getPrescriptionResults } from '@client/actions/users';
import { bindActionCreators } from '@client/utils/components';
import { createStructuredSelector } from 'reselect';
import { getRelated } from '@client/selectors/pages/homes';
import PrescriptionResultItem from '../Item';

type $stateProps = {
  prescriptionResultIds: List<$$id>
};
type $dispatchProps = {
  goToCreatePrescriptionResult: Function,
  getPrescriptionResults: Function
};
type $ownProps = {
  canEdit: boolean,
  userId: $$id
};

type $props = $stateProps & $dispatchProps & $ownProps;

export class MyPrescriptionResults extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getPrescriptionResults();
  }
  render() {
    const { canEdit } = this.props;
    return (
      <div>
        <UL>
          {canEdit && (
            <ULItem
              onClick={this.props.goToCreatePrescriptionResult}
              selectable
              caption="Create PrescriptionResult"
              leftIcon="add"
            />
          )}
          {this.props.prescriptionResultIds.map(id => {
            return (
              <PrescriptionResultItem canEdit={canEdit} key={id} id={id} />
            );
          })}
        </UL>
      </div>
    );
  }
}

export const mapDispatchToProps = (
  dispatch: $$dispatch,
  props: $ownProps
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      goToCreatePrescriptionResult: () => push('/prescriptionResults/create'),
      getPrescriptionResults: () => getPrescriptionResults(props.userId)
    },
    dispatch
  );

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  prescriptionResultIds: getRelated('prescriptionResults')
});
export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  MyPrescriptionResults
);
