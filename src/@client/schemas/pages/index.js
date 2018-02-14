// @flow
import { validateSchema } from 'erschema';
import sessions from './sessions';
import prescriptions from './prescriptions';
import myPrescriptions from './myPrescriptions';

const schema = {
  sessions,
  prescriptions,
  myPrescriptions
};

validateSchema(schema);

module.exports = schema;
