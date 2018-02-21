// @flow
import { getBaseSelectorsPage } from '@client/utils/selectors';
import Model from '@client/models/pages/Tests';

const base = getBaseSelectorsPage('tests', new Model());

module.exports = {
  ...base
};
