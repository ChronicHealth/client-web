// @flow
import { getBaseSelectorsPage } from '@client/utils/selectors';
import { createSelector } from 'reselect';
import Session from '@client/models/pages/Session';

const base = getBaseSelectorsPage('sessions', new Session());
const isLoggedIn = createSelector([base.find()], session => session.token);
module.exports = {
  ...base,
  isLoggedIn
};
