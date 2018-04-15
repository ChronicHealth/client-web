// @flow
import { getBaseSelectors } from '@client/utils/selectors';
import Model from '@client/models/PrescriptionResultsRange';

const base = getBaseSelectors('prescriptionResultsRanges', new Model());

module.exports = {
  ...base
};
