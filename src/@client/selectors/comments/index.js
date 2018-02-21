// @flow
import { getBaseSelectors } from '@client/utils/selectors';
import Model from '@client/models/Comment';

const base = getBaseSelectors('comments', new Model());

module.exports = {
  ...base
};
