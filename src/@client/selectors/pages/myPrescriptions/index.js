// @flow
import { getBaseSelectorsPage } from '@client/utils/selectors';
import Model from '@client/models/pages/MyPrescription';

const base = getBaseSelectorsPage('myPrescriptions', new Model());

module.exports = {
  ...base
};
