// @flow

import khange, { kheck } from 'khange';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getParam } from '@client/selectors/router';
import * as prescriptionSelectors from '@client/selectors/prescriptions';

import { get } from '@client/actions/prescriptions';
import { bindActionCreators, flowRight } from '@client/utils/components';
import { formParent } from '@client/hocs';

const getPrescriptionId = getParam('prescriptionId');

export const mapStateToProps = createStructuredSelector({
  id: getPrescriptionId,
  prescription: prescriptionSelectors.find(getPrescriptionId)
});

export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      get
    },
    dispatch
  );

export const onKhange = (props: Object) => {
  props.get(props.id).then(() => {
    if (props.reinitializeForm) props.reinitializeForm.go();
  });
};

export default flowRight([
  formParent,
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('id'), onKhange)
]);
