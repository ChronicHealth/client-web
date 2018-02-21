// @flow
import { relationshipTypes } from 'normer';
import Model, { properties } from '@client/models/pages/Session';
import { standardizePage } from '@client/utils/schemas';

const relationships = [
  {
    name: 'user',
    entityName: 'users',
    type: relationshipTypes.ONE
  }
];

export default standardizePage('sessions', {
  Model,
  properties,
  relationships
});
