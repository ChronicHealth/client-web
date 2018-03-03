// @flow
import { relationshipTypes } from 'normer';
import { standardize } from '@client/utils/schemas';
import Model, { properties } from '@client/models/Test';

const relationships = [
  {
    name: 'issues',
    type: relationshipTypes.MANY
  }
];

export default standardize({ properties, relationships, Model });
