// @flow
import { getBaseSelectorsPage } from '@client/utils/selectors';
import Model from '@client/models/pages/Home';

const base = getBaseSelectorsPage('homes', new Model());

module.exports = {
  ...base
};
