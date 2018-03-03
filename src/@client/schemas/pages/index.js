// @flow
import { validateSchema } from 'normer';
import sessions from './sessions';
import prescriptions from './prescriptions';
import myPrescriptions from './myPrescriptions';
import tests from './tests';
import myTests from './myTests';
import routines from './routines';
import myRoutines from './myRoutines';
import myClients from './myClients';
import homes from './homes';

const schema = {
  sessions,
  prescriptions,
  myPrescriptions,
  tests,
  myTests,
  routines,
  myRoutines,
  myClients,
  homes
};

validateSchema(schema);

module.exports = schema;
