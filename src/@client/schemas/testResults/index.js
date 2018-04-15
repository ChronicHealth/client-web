// @flow
import { relationshipTypes } from 'normer';
import { standardize } from '@client/utils/schemas';
import Model, { properties } from '@client/models/TestResult';
import { getId } from '@client/utils/testResults';

const relationships = [];

export default standardize({ properties, relationships, idFunc: getId });
