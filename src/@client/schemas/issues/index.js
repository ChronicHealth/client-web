// @flow
import { relationshipTypes } from 'normer';
import { standardize } from '@client/utils/schemas';
import Model, { properties } from '@client/models/Issue';

const relationships = [
  {
    entityName: 'comments',
    type: relationshipTypes.MANY
  }
];

export default standardize({ properties, relationships, Model });
