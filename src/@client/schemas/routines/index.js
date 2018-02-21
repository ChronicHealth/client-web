// @flow
import { relationshipTypes } from 'normer';
import { standardize } from '@client/utils/schemas';
import Model, { properties } from '@client/models/Routine';

const relationships = [
  {
    name: 'prescriptions',
    type: relationshipTypes.MANY
  },
  {
    name: 'tests',
    type: relationshipTypes.MANY
  },
  {
    name: 'issues',
    type: relationshipTypes.MANY
  }
];

export default standardize({ properties, relationships, Model });
