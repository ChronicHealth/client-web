// @flow
import { validateSchema } from 'erschema';
import sessions from './sessions';

const schema = {
  sessions
};

validateSchema(schema);

module.exports = schema;
