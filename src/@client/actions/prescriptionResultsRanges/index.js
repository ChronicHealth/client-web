// @flow

import { erActions } from '@client/utils/actions';
import service from '@client/services/prescriptionResults';
import { Moment } from 'moment';

const base = erActions('prescriptionResultsRanges');

module.exports = {
  getRange: (clientId: $$id, startDate: Moment, endDate: Moment) => (
    dispatch: $$dispatch
  ) => {
    return service.getRange(clientId, { startDate, endDate }).then(range => {
      dispatch(base.get({ ...range, startDate, endDate }));
      return range;
    });
  }
};
