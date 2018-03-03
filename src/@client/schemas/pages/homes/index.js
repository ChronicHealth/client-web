// @flow
import { relationshipTypes } from 'normer';
import Model, { properties } from '@client/models/pages/Home';
import { standardizePage } from '@client/utils/schemas';

const relationships = [
  {
    name: 'prescriptionGroups',
    type: relationshipTypes.MANY
  }
];

export default standardizePage('homes', { Model, properties, relationships });
