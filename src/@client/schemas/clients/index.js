// @flow
import { relationshipTypes } from 'normer';
import { standardize } from '@client/utils/schemas';
import Model, { properties } from '@client/models/Client';

const relationships = [
  {
    name: 'routine',
    entityName: 'routines',
    type: relationshipTypes.ONE
  },
  {
    name: 'scopes',
    entityName: 'scopes',
    type: relationshipTypes.MANY
  }
];

export default standardize({ properties, relationships, Model });
