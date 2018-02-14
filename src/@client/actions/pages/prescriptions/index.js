// @flow
import { pageERActions } from '@client/utils/actions';
import services from '@client/services/prescriptions';

const { get } = pageERActions('prescriptions');

module.exports = {
  getPrescriptions: () => (dispatch: $$dispatch) => {
    return services.index().then(prescriptions => {
      dispatch(get({ prescriptions }));
      return prescriptions;
    });
  }
};
