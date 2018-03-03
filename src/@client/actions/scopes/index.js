// @flow

import { baseActions } from '@client/utils/actions';
import { entity } from '@client/reducers/scopes';
import service from '@client/services/scopes';
import { push } from '@client/actions/router';

const base = baseActions('scopes', entity, service);

module.exports = {
  ...base,
  goToScope: id => push(`/scope/${id}`)
};
