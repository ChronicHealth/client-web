// @flow

import { baseActions } from '@client/utils/actions';
import { entity } from '@client/reducers/effects';
import service from '@client/services/effects';
import { push } from '@client/actions/router';

const base = baseActions('effects', entity, service);

module.exports = {
  ...base,
  goToEffect: id => push(`/effects/${id}`),
  goToEditEffect: id => push(`/effects/${id}/edit`)
};
