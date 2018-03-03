// @flow
import { getBaseSelectors } from '@client/utils/selectors';
import Model from '@client/models/PrescriptionGroup';

const base = getBaseSelectors('prescriptionGroups', new Model());

module.exports = {
  ...base
};
