// @flow
import { baseServices } from '@client/utils/services';

const base = baseServices('body_levels');

module.exports = {
  ...base,
  byUser: (userId: $$id) => base.get(`by_user/${userId}`)
};
