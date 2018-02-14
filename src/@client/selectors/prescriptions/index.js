// @flow
import { getBaseSelectors } from '@client/utils/selectors';
import Prescription from '@client/models/Prescription';

const base = getBaseSelectors('prescriptions', new Prescription());

module.exports = {
  ...base
};
