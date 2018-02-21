// @flow
import { getBaseSelectorsPage } from '@client/utils/selectors';
import Model from '@client/models/pages/MyRoutine';

const base = getBaseSelectorsPage('myRoutines', new Model());

module.exports = {
  ...base
};
