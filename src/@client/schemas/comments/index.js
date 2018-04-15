// @flow
import { relationshipTypes } from 'normer';
import { standardize } from '@client/utils/schemas';
import Model, { properties } from '@client/models/Comment';

const relationships = [
  // {
  // entityName: 'users',
  // name: 'user',
  // alias: 'userId',
  // type: relationshipTypes.ONE,
  // }
];

export default standardize({ properties, relationships });
