// @flow
import { baseServices } from '@client/utils/services';

const base = baseServices('clientRoutines');

module.exports = {
  ...base,
  byClient: (id: $$id) => base.get(`by_client/${id}`)
};
