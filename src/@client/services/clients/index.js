// @flow
import { baseServices } from '@client/utils/services';

const base = baseServices('clients');

module.exports = {
  ...base,
  byUser: () => base.get('by_user')
};
