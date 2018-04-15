// @flow

import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';
import { componentWillMount } from '../../../@client/hocs';
import { getParam } from '@client/selectors/router';
import * as routineSelectors from '@client/selectors/routines';
import * as prescriptionSelectors from '@client/selectors/prescriptions';
import * as bodyLevelSelectors from '@client/selectors/bodyLevels';
import { formParent } from '@client/hocs';
import * as homeActions from '@client/actions/pages/homes';
import { getBatch as getBatchPrescriptions } from '@client/actions/prescriptions';
import { getBatch as getBatchPrescriptionGroups } from '@client/actions/prescriptionGroups';
import { getBatch as getBatchTests } from '@client/actions/tests';
import { findRelated } from '@client/selectors/pages/homes';
import { bindActionCreators } from '@client/utils/components';

const getRoutineId = findRelated('routine');

const getRoutine = routineSelectors.find(getRoutineId);

const prescriptionIds = routineSelectors.getRelated(
  'prescriptions',
  getRoutineId
);

const bodyLevelIds = routineSelectors.getRelated('bodyLevels', getRoutineId);

export const mapStateToProps = createStructuredSelector({
  id: getRoutineId,
  routine: getRoutine,
  prescriptions: prescriptionSelectors.get(prescriptionIds),
  bodyLevels: bodyLevelSelectors.get(bodyLevelIds),
  bodyLevelIds,
  prescriptionIds
});

export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      get: homeActions.getRoutine,
      getBatchPrescriptions,
      getBatchPrescriptionGroups,
      getBatchTests
    },
    dispatch
  );

export const onComponentWillMount = (props: Object) => {
  props.get().then(routine => {
    if (routine) {
      props.reinitializeForm.go();
    }
  });
};

export default flowRight([
  formParent,
  connect(mapStateToProps, mapDispatchToProps),
  componentWillMount(onComponentWillMount)
]);
