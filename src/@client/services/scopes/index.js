// @flow
import { baseServices } from '@client/utils/services';

const base = baseServices('scopes');

module.exports = {
  ...base,
  verifyName: (name, id) => base.post('verify_name', { id, name })
};
