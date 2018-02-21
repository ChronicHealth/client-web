// @flow
import { relationshipTypes } from 'normer';
import Model, { properties } from '@client/models/pages/MyTests';
import { standardizePage } from '@client/utils/schemas';

const relationships = [
  {
    name: 'tests',
    type: relationshipTypes.MANY
  }
];

export default standardizePage('myTests', { Model, properties, relationships });
