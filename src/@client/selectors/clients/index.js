// @flow
import { getBaseSelectors } from '@client/utils/selectors';
import Model from '@client/models/Client';

const base = getBaseSelectors('clients', new Model());

module.exports = {
  ...base
};
