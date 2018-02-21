// @flow
import { relationshipTypes } from 'normer';
import Model, { properties } from '@client/models/pages/Tests';
import { standardizePage } from '@client/utils/schemas';

const relationships = [
  {
    name: 'tests',
    type: relationshipTypes.MANY
  }
];

export default standardizePage('tests', { Model, properties, relationships });
