// @flow
import { pageERActions } from '@client/utils/actions';
import services from '@client/services/routines';
const { get } = pageERActions('myRoutines');

module.exports = {
  getRoutines: () => (dispatch: $$dispatch) => {
    return services.my().then(routines => {
      dispatch(get({ routines }));
      return routines;
    });
  }
};
