// @flow
import { getBaseSelectors } from '@client/utils/selectors';
import Model from '@client/models/Issue';

const base = getBaseSelectors('issues', new Model());

module.exports = {
  ...base
};
