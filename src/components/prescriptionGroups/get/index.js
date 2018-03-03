// @flow

import khange, { kheck } from 'khange';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getParam } from '@client/selectors/router';
import * as prescriptionGroupSelectors from '@client/selectors/prescriptionGroups';

import { get } from '@client/actions/prescriptionGroups';
import { getBatch } from '@client/actions/prescriptions';
import { bindActionCreators, flowRight } from '@client/utils/components';
import { formParent } from '@client/hocs';

const getPrescriptionId = getParam('prescriptionGroupId');

export const mapStateToProps = createStructuredSelector({
  id: getPrescriptionId,
  prescriptionGroup: prescriptionGroupSelectors.find(getPrescriptionId),
  prescriptionIds: prescriptionGroupSelectors.getRelated(
    'prescriptions',
    getPrescriptionId
  )
});

export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      get,
      getPrescriptions: getBatch
    },
    dispatch
  );

export const onKhange = (props: Object) => {
  return props.get(props.id).then(prescriptionGroup => {
    if (props.reinitializeForm) props.reinitializeForm.go();
    return props.getPrescriptions(prescriptionGroup.prescriptions);
  });
};

export default flowRight([
  formParent,
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('id'), onKhange)
]);
