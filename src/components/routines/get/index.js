// @flow

import khange, { kheck } from 'khange';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';
import { getParam } from '@client/selectors/router';
import * as routineSelectors from '@client/selectors/routines';
import * as prescriptionSelectors from '@client/selectors/prescriptions';
import * as testSelectors from '@client/selectors/tests';
import { formParent } from '@client/hocs';

import { get } from '@client/actions/routines';
import { getBatch as getBatchPrescriptions } from '@client/actions/prescriptions';
import { getBatch as getBatchTests } from '@client/actions/tests';
import { bindActionCreators } from '@client/utils/components';

const getRoutineId = getParam('routineId');

const prescriptionIds = routineSelectors.getRelated(
  'prescriptions',
  getRoutineId
);
const testIds = routineSelectors.getRelated('tests', getRoutineId);

export const mapStateToProps = createStructuredSelector({
  id: getRoutineId,
  routine: routineSelectors.find(getRoutineId),
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
      getBatchTests
    },
    dispatch
  );

export const onKhange = (props: Object) => {
  props.get(props.id).then(routine => {
    if (routine) {
      props.getBatchPrescriptions(routine.prescriptions);
      props.getBatchTests(routine.tests);
      props.reinitializeForm.go();
    }
  });
};

export default flowRight([
  formParent,
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('id'), onKhange)
]);
