// @flow
import { baseServices } from '@client/utils/services';

const base = baseServices('prescriptions');

module.exports = {
  ...base,
  my: () => base.get('my')
};
