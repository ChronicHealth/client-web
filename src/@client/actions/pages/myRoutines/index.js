// @flow
import { pageERActions } from '@client/utils/actions';
import services from '@client/services/routines';
const { get } = pageERActions('myRoutines');

module.exports = {
  getRoutines: (id: $$id) => (dispatch: $$dispatch) => {
    return services.byUser(id).then(routines => {
      dispatch(get({ routines }));
      return routines;
    });
  }
};
