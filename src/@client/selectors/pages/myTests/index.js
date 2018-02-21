// @flow
import { getBaseSelectorsPage } from '@client/utils/selectors';
import Model from '@client/models/pages/MyTests';

const base = getBaseSelectorsPage('myTests', new Model());

module.exports = {
  ...base
};
