// @flow

import { baseActions } from '@client/utils/actions';
import { entity } from '@client/reducers/prescriptionGroups';
import service from '@client/services/prescriptionGroups';
import { push } from '@client/actions/router';

const base = baseActions('prescriptionGroups', entity, service);

module.exports = {
  ...base,
  goToPrescriptionGroup: id => push(`/prescription_groups/${id}`),
  goToEditPrescriptionGroup: id => push(`/prescription_groups/${id}/edit`)
};
