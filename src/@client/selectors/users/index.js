// @flow
import { getBaseSelectors } from '@client/utils/selectors';
import User from '@client/models/User';
import * as session from '@client/selectors/pages/sessions';

const base = getBaseSelectors('users', new User());
const currentUserId = session.findRelated('user');
const currentUser = base.find(currentUserId);

module.exports = {
  ...base,
  currentUser,
  currentUserId
};
