// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { find } from '@client/selectors/prescriptions';
import { Chip } from '../../../ui-kit';
import Prescription from '../../../@client/models/Prescription';

type $stateProps = { prescription: Prescription };
type $ownProps = {};
type $dispatchProps = {};
type $props = $stateProps & $dispatchProps & $ownProps;
export class PrescriptionChip extends React.PureComponent<$props> {
  render() {
    const { prescription, ...props } = this.props;
    return <Chip {...props}>{prescription.name}</Chip>;
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  prescription: find()
});

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators({}, dispatch);

export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  PrescriptionChip
);
