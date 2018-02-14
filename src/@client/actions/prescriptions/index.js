// @flow

import { baseActions } from '@client/utils/actions';
import { entity } from '@client/reducers/prescriptions';
import service from '@client/services/prescriptions';

import { push } from '@client/actions/router';

const base = baseActions('prescriptions', entity, service);

module.exports = {
  ...base,
  goToPrescription: id => push(`/prescriptions/${id}`),
  goToEditPrescription: id => push(`/prescriptions/${id}/edit`)
};
