// @flow
import { validateSchema } from 'normer';
import users from './users';
import prescriptions from './prescriptions';
import tests from './tests';
import routines from './routines';
import issues from './issues';
import comments from './comments';
import clients from './clients';
import clientRoutines from './clientRoutines';
import prescriptionGroups from './prescriptionGroups';
import scopes from './scopes';
import bodyLevels from './bodyLevels';
import prescriptionResults from './prescriptionResults';
import prescriptionResultsRanges from './prescriptionResultsRanges';
import testResults from './testResults';
import testResultRanges from './testResultRanges';
import effects from './effects';

const schema = {
  users,
  prescriptions,
  tests,
  routines,
  issues,
  comments,
  clients,
  clientRoutines,
  prescriptionGroups,
  scopes,
  bodyLevels,
  prescriptionResults,
  prescriptionResultsRanges,
  testResultRanges,
  testResults,
  effects
};
validateSchema(schema);

module.exports = schema;
