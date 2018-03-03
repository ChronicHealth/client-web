// @flow
import { pageERActions } from '@client/utils/actions';
import prescriptionGroupService from '@client/services/prescriptionGroups';

const base = pageERActions('homes');

module.exports = {
  getPrescriptionGroups: () => (dispatch: $$dispatch) => {
    return prescriptionGroupService.index().then(prescriptionGroups => {
      dispatch(base.get({ prescriptionGroups }));
      return prescriptionGroups;
    });
  }
};
