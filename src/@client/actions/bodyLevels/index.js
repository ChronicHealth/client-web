// @flow

import { baseActions } from '@client/utils/actions';
import { entity } from '@client/reducers/bodyLevels';
import service from '@client/services/bodyLevels';
import { push } from '@client/actions/router';

const base = baseActions('bodyLevels', entity, service);

module.exports = {
  ...base,
  goToBodyLevel: id => push(`/body_level/${id}`)
};
