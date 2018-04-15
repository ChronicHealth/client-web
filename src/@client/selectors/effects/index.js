// @flow
import { getBaseSelectors } from '@client/utils/selectors';
import Model from '@client/models/Effect';

const base = getBaseSelectors('effects', new Model());

module.exports = {
  ...base
};
