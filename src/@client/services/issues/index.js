// @flow
import { baseServices } from '@client/utils/services';

const base = baseServices('issues');

module.exports = {
  ...base,
  byType: (type: number, id: $$id) => base.get(`by_type/${type}/${id}`)
};
