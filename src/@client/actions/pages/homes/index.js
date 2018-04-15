// @flow
import { pageERActions } from '@client/utils/actions';
import routineService from '@client/services/routines';
import effectService from '@client/services/effects';
import prescriptionGroupService from '@client/services/prescriptionGroups';
import bodyLevelService from '@client/services/bodyLevels';
import { getBatch as getBatchPrescriptions } from '@client/actions/prescriptions';
import { getBatch as getBatchBodyLevels } from '@client/actions/bodyLevels';
const base = pageERActions('homes');

module.exports = {
  getPrescriptionGroups: () => (dispatch: $$dispatch) => {
    return prescriptionGroupService.index().then(prescriptionGroups => {
      dispatch(base.get({ prescriptionGroups }));
      return prescriptionGroups;
    });
  },
  getRoutine: () => (dispatch: $$dispatch) => {
    return routineService.index().then(routine => {
      dispatch(base.get({ routine }));
      dispatch(getBatchPrescriptions(routine.prescriptions));
      dispatch(getBatchBodyLevels(routine.bodyLevels));
      return routine;
    });
  },
  getBodyLevels: () => (dispatch: $$dispatch) => {
    return bodyLevelService.index().then(bodyLevels => {
      dispatch(base.get({ bodyLevels }));
      return bodyLevels;
    });
  },
  getEffects: () => (dispatch: $$dispatch) => {
    return effectService.index().then(effects => {
      dispatch(base.get({ effects }));
      return effects;
    });
  }
};
