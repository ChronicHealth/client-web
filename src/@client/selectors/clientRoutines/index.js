// @flow
import { getBaseSelectors } from '@client/utils/selectors';
import Model from '@client/models/ClientRoutine';

const base = getBaseSelectors('clientRoutines', new Model());

module.exports = {
  ...base
};
