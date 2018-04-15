// @flow
import { getBaseSelectors } from '@client/utils/selectors';
import Model from '@client/models/PrescriptionResult';

const base = getBaseSelectors('prescriptionResults', new Model());

module.exports = {
  ...base
};
