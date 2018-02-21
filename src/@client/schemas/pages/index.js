// @flow
import { validateSchema } from 'normer';
import sessions from './sessions';
import prescriptions from './prescriptions';
import myPrescriptions from './myPrescriptions';
import tests from './tests';
import myTests from './myTests';
import routines from './routines';
import myRoutines from './myRoutines';

const schema = {
  sessions,
  prescriptions,
  myPrescriptions,
  tests,
  myTests,
  routines,
  myRoutines
};

validateSchema(schema);

module.exports = schema;
