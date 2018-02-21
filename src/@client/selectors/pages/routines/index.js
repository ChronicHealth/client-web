// @flow
import { getBaseSelectorsPage } from '@client/utils/selectors';
import Model from '@client/models/pages/Routine';

const base = getBaseSelectorsPage('routines', new Model());

module.exports = {
  ...base
};
