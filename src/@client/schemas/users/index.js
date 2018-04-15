// @flow
import { properties } from '@client/models/User';
import { standardize } from '@client/utils/schemas';

const relationships = [
  {
    name: 'bodyLevels'
  },
  {
    name: 'effects'
  },
  {
    name: 'scopes'
  }
];

export default standardize({ properties, relationships });
