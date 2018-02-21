// @flow
import { pageERActions } from '@client/utils/actions';
import services from '@client/services/tests';

const { get } = pageERActions('myTests');

module.exports = {
  getTests: () => (dispatch: $$dispatch) => {
    return services.my().then(tests => {
      dispatch(get({ tests }));
      return tests;
    });
  }
};
