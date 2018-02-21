// @flow
import { validateSchema } from 'normer';
import users from './users';
import prescriptions from './prescriptions';
import tests from './tests';
import routines from './routines';
import issues from './issues';
import comments from './comments';

const schema = {
  users,
  prescriptions,
  tests,
  routines,
  issues,
  comments
};
validateSchema(schema);

module.exports = schema;
