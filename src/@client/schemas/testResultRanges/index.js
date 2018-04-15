// @flow
import { relationshipTypes } from 'normer';
import { standardize } from '@client/utils/schemas';
import Model, { properties } from '@client/models/TestResultRange';

const relationships = [];

export default standardize({
  properties,
  relationships,
  idFunc: ent => `${ent.clientId}-${ent.bodyLevelId}`
});
