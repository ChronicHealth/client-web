// @flow
import { baseServices } from '@client/utils/services';

const base = baseServices('tests');

module.exports = {
  ...base,
  byUser: (id: $$id) => base.get(`by_user/${id}`)
};
