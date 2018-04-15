// @flow

import khange, { kheck } from 'khange';
import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { getParam } from '@client/selectors/router';
import * as prescriptionSelectors from '@client/selectors/prescriptions';

import { get } from '@client/actions/prescriptions';
import { getBatch as getEffects } from '@client/actions/effects';
import * as effectSelectors from '@client/selectors/effects';
import { bindActionCreators, flowRight } from '@client/utils/components';
import { formParent } from '@client/hocs';

const getPrescriptionId = getParam('prescriptionId');

const getPrescription = prescriptionSelectors.find(getPrescriptionId);

const getEffectIds = createSelector([getPrescription], prescription => {
  return prescription.effects;
});

export const mapStateToProps = createStructuredSelector({
  id: getPrescriptionId,
  prescription: getPrescription,
  effects: effectSelectors.get(getEffectIds)
});

export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      get,
      getEffects
    },
    dispatch
  );

export const onKhange = (props: Object) => {
  props.get(props.id).then(prescription => {
    if (!prescription) return null;
    props.getEffects(prescription.effects);
    if (props.reinitializeForm) props.reinitializeForm.go();
  });
};

export default flowRight([
  formParent,
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('id'), onKhange)
]);
