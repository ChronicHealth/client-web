// @flow
import { relationshipTypes } from 'erschema';
import Model, { properties } from '@client/models/pages/Prescription';
import { standardizePage } from '@client/utils/schemas';

const relationships = [
  {
    name: 'prescriptions',
    type: relationshipTypes.MANY
  }
];

export default standardizePage('prescriptions', {
  Model,
  properties,
  relationships
});
