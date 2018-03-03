// @flow
import { pageERActions } from '@client/utils/actions';
import services from '@client/services/prescriptions';

const { get } = pageERActions('myPrescriptions');

module.exports = {
  getPrescriptions: (id: $$id) => (dispatch: $$dispatch) => {
    return services.byUser(id).then(prescriptions => {
      dispatch(get({ prescriptions }));
      return prescriptions;
    });
  }
};
