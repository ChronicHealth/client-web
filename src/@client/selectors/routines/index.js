// @flow
import { getBaseSelectors } from '@client/utils/selectors';
import Model from '@client/models/Routine';

const base = getBaseSelectors('routines', new Model());

module.exports = {
  ...base
};
