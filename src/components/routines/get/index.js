// @flow

import khange, { kheck } from 'khange';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';
import { getParam } from '@client/selectors/router';
import * as routineSelectors from '@client/selectors/routines';
import * as prescriptionSelectors from '@client/selectors/prescriptions';
import * as testSelectors from '@client/selectors/tests';
import { formParent } from '@client/hocs';

import { get } from '@client/actions/routines';
import { getBatch as getBatchPrescriptions } from '@client/actions/prescriptions';
import { getBatch as getBatchPrescriptionGroups } from '@client/actions/prescriptionGroups';
import { getBatch as getBatchTests } from '@client/actions/tests';
import { bindActionCreators } from '@client/utils/components';

const getRoutineId = getParam('routineId');

const getRoutine = routineSelectors.find(getRoutineId);

const prescriptionIds = routineSelectors.getRelated(
  'prescriptions',
  getRoutineId
);
const testIds = createSelector([getRoutine], routine => {
  return routine.tests.map(t => t.id);
});

export const mapStateToProps = createStructuredSelector({
  id: getRoutineId,
  routine: getRoutine,
  prescriptions: prescriptionSelectors.get(prescriptionIds),
  tests: testSelectors.get(testIds),
  testIds,
  prescriptionIds
});

export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      get,
      getBatchPrescriptions,
      getBatchPrescriptionGroups,
      getBatchTests
    },
    dispatch
  );

export const onKhange = (props: Object) => {
  props.get(props.id).then(routine => {
    if (routine) {
      const testIds = routine.tests.map(t => t.id);
      const prescriptionGroupIds = routine.tests.map(
        t => t.prescriptionGroupId
      );
      props.getBatchPrescriptions(routine.prescriptions);
      props.getBatchTests(testIds);
      props.getBatchPrescriptionGroups(prescriptionGroupIds);
      props.reinitializeForm.go();
    }
  });
};

export default flowRight([
  formParent,
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('id'), onKhange)
]);
