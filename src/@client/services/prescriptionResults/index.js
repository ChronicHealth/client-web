// @flow
import { baseServices } from '@client/utils/services';
import { Moment } from 'moment';

const base = baseServices('prescription_results');

module.exports = {
  get: (clientId: $$id, date: Moment) => base.post(`${clientId}`, { date }),
  update: base.update,
  getPrevious: (clientId: $$id, date: Moment) =>
    base.post(`${clientId}/previous`, { date }),
  getWeek: (clientId: $$id, date: Moment) =>
    base.post(`${clientId}/week`, { date }),
  getRange: (clientId: $$id, payload: Object) =>
    base.post(`${clientId}/range`, payload)
};
