// @flow
import { getBaseSelectors } from '@client/utils/selectors';
import Model from '@client/models/Tests';

const base = getBaseSelectors('tests', new Model());

module.exports = {
  ...base
};
