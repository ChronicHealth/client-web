// @flow
import { baseServices } from '@client/utils/services';
import moment from 'moment';
const base = baseServices('test_results');

module.exports = {
  ...base,
  byBodyLevel: (clientId: $$id, bodyLevelId: $$id) =>
    base.post('body_level', { clientId, bodyLevelId }),
  get: (payload: { date: moment, clientId: $$id, bodyLevelId: $$id }) =>
    base.post('get', payload)
};
