// @flow
import { getBaseSelectors } from '@client/utils/selectors';
import Model from '@client/models/BodyLevel';

const base = getBaseSelectors('bodyLevels', new Model());

module.exports = {
  ...base
};
