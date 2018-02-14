// @flow
import { getBaseSelectorsPage } from '@client/utils/selectors';
import Model from '@client/models/pages/Prescription';

const base = getBaseSelectorsPage('prescriptions', new Model());

module.exports = {
  ...base
};
