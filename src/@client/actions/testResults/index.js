// @flow

import { erActions, baseActions } from '@client/utils/actions';
import service from '@client/services/testResults';
import moment from 'moment';
import { entity } from '@client/reducers/testResults';

const er = erActions('testResults');
const { create, update } = baseActions('testResults', entity, service);

module.exports = {
  get: ({
    date,
    clientId,
    bodyLevelId
  }: {
    date: moment,
    clientId: $$id,
    bodyLevelId: $$id
  }) => (dispatch: $$dispatch) => {
    return service.get({ date, clientId, bodyLevelId }).then(testResult => {
      dispatch(er.get({ date, clientId, bodyLevelId, ...testResult }));
      return testResult;
    });
  },
  create,
  update
};
