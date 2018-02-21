// @flow
import { relationshipTypes } from 'normer';
import Model, { properties } from '@client/models/pages/Routine';
import { standardizePage } from '@client/utils/schemas';

const relationships = [
  {
    name: 'routines',
    type: relationshipTypes.MANY
  }
];

export default standardizePage('routines', {
  Model,
  properties,
  relationships
});
