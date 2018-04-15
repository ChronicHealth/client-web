// @flow
import { getBaseSelectors } from '@client/utils/selectors';
import Model from '@client/models/TestResult';

const base = getBaseSelectors('testResults', new Model());

module.exports = {
  ...base
};
