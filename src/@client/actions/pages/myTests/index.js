// @flow
import { pageERActions } from '@client/utils/actions';
import services from '@client/services/tests';

const { get } = pageERActions('myTests');

module.exports = {
  getTests: (id: $$id) => (dispatch: $$dispatch) => {
    return services.byUser(id).then(tests => {
      dispatch(get({ tests }));
      return tests;
    });
  }
};
