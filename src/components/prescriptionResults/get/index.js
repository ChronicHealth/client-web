// @flow

import khange, { kheck } from 'khange';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getParam } from '@client/selectors/router';
import { flowRight } from 'lodash';
import * as prescriptionResultSelectors from '@client/selectors/prescriptionResults';
import PrescriptionResult from '@client/models/PrescriptionResult';
import { get } from '@client/actions/prescriptionResults';
import { bindActionCreators } from '@client/utils/components';
import { formParent } from '@client/hocs';

const getPrescriptionResultId = getParam('prescriptionResultId');

export type $stateProps = {
  id: $$id,
  prescriptionResult: PrescriptionResult
};

type $dispatchProps = {
  get: Function
};

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  id: getPrescriptionResultId,
  prescriptionResult: prescriptionResultSelectors.find(getPrescriptionResultId)
});

export const mapDispatchToProps = (
  dispatch: $$dispatch
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      get
    },
    dispatch
  );

export const onKhange = (
  props: $$formParentProps & $stateProps & $dispatchProps
) => {
  props.get(props.id).then(() => {
    if (props.reinitializeForm) props.reinitializeForm.go();
  });
};

export default flowRight([
  formParent,
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('id'), onKhange)
]);
