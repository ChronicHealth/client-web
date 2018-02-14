// @flow
import { validateSchema } from 'erschema';
import users from './users';
import prescriptions from './prescriptions';

const schema = {
  users,
  prescriptions
};
validateSchema(schema);

module.exports = schema;
