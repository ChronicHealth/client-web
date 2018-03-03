// @flow

import { baseActions } from '@client/utils/actions';
import { entity } from '@client/reducers/clientRoutines';
import service from '@client/services/clientRoutines';
import { push } from '@client/actions/router';

const base = baseActions('clientRoutines', entity, service);

module.exports = {
  ...base,
  goToClientRoutine: id => push(`/clientRoutines/${id}`)
};
