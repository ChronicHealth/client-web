// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import getPrescriptionGroup from '../get';
import PrescriptionItem from 'components/prescriptions/Item';
import { UL } from 'ui-kit';
import PrescriptionGroup from '@client/models/PrescriptionGroup';

type $stateProps = {};
type $ownProps = { prescriptionGroup: PrescriptionGroup };
type $dispatchProps = {};
type $props = $stateProps & $dispatchProps & $ownProps;
export class PrescriptionGroupsShow extends React.PureComponent<$props> {
  render() {
    const { prescriptionGroup: pg, ...props } = this.props;
    return (
      <div>
        <h1>{pg.name}</h1>
        {
          <React.Fragment>
            <h2>Notes</h2>
            <p>{pg.notes}</p>
          </React.Fragment>
        }
        <h2>Prescriptions</h2>
        <UL>
          {props.prescriptionIds.map(id => (
            <PrescriptionItem id={id} key={id} />
          ))}
        </UL>
      </div>
    );
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector(
  {}
);

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators({}, dispatch);

export default flowRight([
  getPrescriptionGroup,
  connect(mapStateToProps, mapDispatchToProps)
])(PrescriptionGroupsShow);
