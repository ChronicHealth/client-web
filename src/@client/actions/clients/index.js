// @flow
import { erActions } from '@client/utils/actions';

import { baseActions } from '@client/utils/actions';
import { entity } from '@client/reducers/clients';
import service from '@client/services/clients';
import * as clientRoutineService from '@client/services/clientRoutines';
import { push } from '@client/actions/router';

const base = baseActions('clients', entity, service);
const er = erActions('clients');

module.exports = {
  ...base,
  goToClient: id => push(`/clients/${id}`),
  getRoutines: (id: $$id) => (dispatch: $$dispatch) =>
    clientRoutineService.byClient(id).then(clientRoutines => {
      dispatch(er.get({ id, clientRoutines }));
    })
};
