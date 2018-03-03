// @flow
import { pageERActions } from '@client/utils/actions';
import { byUser } from '@client/services/clients';

const base = pageERActions('myClients');

module.exports = {
  ...base,
  getClients: () => dispatch =>
    byUser().then(clients => {
      dispatch(base.get({ clients }));
      return clients;
    })
};
