// @flow
import { baseServices } from '@client/utils/services';

const base = baseServices('routines');

module.exports = {
  ...base,
  my: () => base.get('my')
};
