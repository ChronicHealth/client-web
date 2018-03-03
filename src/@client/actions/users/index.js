// @flow
import { baseActions, erActions } from '@client/utils/actions';
import { entity } from '@client/reducers/users';
import service from '@client/services/users';
import { byUser } from '@client/services/prescriptionGroups';
import * as sessionActions from '@client/actions/pages/sessions';
import { push } from '@client/actions/router';
/* eslint-disable */
const { create, ...base } = baseActions('users', entity, service);
const er = erActions('users');
/* eslint-enable */
module.exports = {
  ...base,
  getPrescriptionGroups: (id: $$id) => (dispatch: $$dispatch) => {
    return byUser(id).then(prescriptionGroups => {
      dispatch(
        er.get({
          id,
          prescriptionGroups
        })
      );
      return prescriptionGroups;
    });
  },
  create: values => dispatch => {
    return service.create(values).then(({ session, user }) => {
      dispatch(sessionActions.login(session, { ...user, ...values }));
    });
  },
  goToUser: id => push(`/users/${id}`)
};
