// @flow
import { erActions } from '@client/utils/actions';

import { baseActions } from '@client/utils/actions';
import { entity } from '@client/reducers/clients';
import service from '@client/services/clients';
import * as clientRoutineService from '@client/services/clientRoutines';
import { push } from '@client/actions/router';
import { getBatch as getBatchPrescriptions } from '@client/actions/prescriptions';
import { getBatch as getBatchBodyLevels } from '@client/actions/bodyLevels';

const base = baseActions('clients', entity, service);
const er = erActions('clients');

module.exports = {
  ...base,
  goToClient: id => push(`/clients/${id}`),
  getRoutine: (id: $$id) => (dispatch: $$dispatch) =>
    clientRoutineService.byClient(id).then(routine => {
      if (!routine) return routine;
      dispatch(er.get({ id, routine }));
      dispatch(getBatchPrescriptions(routine.prescriptions));
      dispatch(getBatchBodyLevels(routine.bodyLevels));
      return routine;
    })
};
