// @flow
import { baseServices } from '@client/utils/services';

const base = baseServices('sessions');

const checkIfLoggedIn = base.index;

module.exports = {
  checkIfLoggedIn,
  ...base
};
