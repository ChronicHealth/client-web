// @flow
import { relationshipTypes } from 'normer';
import Model, { properties } from '@client/models/pages/Home';
import { standardizePage } from '@client/utils/schemas';

const relationships = [
  {
    name: 'prescriptionGroups',
    type: relationshipTypes.MANY
  },
  {
    name: 'bodyLevels',
    type: relationshipTypes.MANY
  },
  {
    name: 'effects',
    type: relationshipTypes.MANY
  },
  {
    name: 'routine',
    entityName: 'routines',
    type: relationshipTypes.ONE
  }
];

export default standardizePage('homes', { Model, properties, relationships });
