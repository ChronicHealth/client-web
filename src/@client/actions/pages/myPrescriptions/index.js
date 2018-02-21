// @flow
import { pageERActions } from '@client/utils/actions';
import services from '@client/services/prescriptions';

const { get } = pageERActions('myPrescriptions');

module.exports = {
  getPrescriptions: () => (dispatch: $$dispatch) => {
    return services.my().then(prescriptions => {
      dispatch(get({ prescriptions }));
      return prescriptions;
    });
  }
};
