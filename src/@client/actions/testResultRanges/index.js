// @flow

import { erActions } from '@client/utils/actions';
import service from '@client/services/testResults';

const base = erActions('testResultRanges');

module.exports = {
  byBodyLevel: ({
    clientId,
    bodyLevelId
  }: {
    clientId: $$id,
    bodyLevelId: $$id
  }) => (dispatch: $$dispatch) => {
    return service.byBodyLevel(clientId, bodyLevelId).then(data => {
      dispatch(base.get({ clientId, bodyLevelId, data }));
      return data;
    });
  }
};
