// @flow
import { relationshipTypes } from 'normer';
import Model, { properties } from '@client/models/pages/MyPrescription';
import { standardizePage } from '@client/utils/schemas';

const relationships = [
  {
    name: 'prescriptions',
    type: relationshipTypes.MANY
  }
];

export default standardizePage('myPrescriptions', {
  Model,
  properties,
  relationships
});
