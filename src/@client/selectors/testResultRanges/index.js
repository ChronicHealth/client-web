// @flow
import { getBaseSelectors } from '@client/utils/selectors';
import Model from '@client/models/TestResultRange';

const base = getBaseSelectors('testResultRanges', new Model());

module.exports = {
  ...base
};
