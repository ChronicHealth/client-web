// @flow
import { pageERActions } from '@client/utils/actions';
import services from '@client/services/routines';

const { get } = pageERActions('routines');

module.exports = {
  getRoutines: () => (dispatch: $$dispatch) => {
    return services.index().then(routines => {
      dispatch(get({ routines }));
      return routines;
    });
  }
};
