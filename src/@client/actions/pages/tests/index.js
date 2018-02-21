// @flow
import { pageERActions } from '@client/utils/actions';
import services from '@client/services/tests';

const { get } = pageERActions('tests');

module.exports = {
  getTests: () => (dispatch: $$dispatch) => {
    return services.index().then(tests => {
      dispatch(get({ tests }));
      return tests;
    });
  }
};
