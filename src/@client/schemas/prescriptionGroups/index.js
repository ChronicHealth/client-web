// @flow
import { relationshipTypes } from 'normer';
import { standardize } from '@client/utils/schemas';
import Model, { properties } from '@client/models/PrescriptionGroup';

const relationships = [
  {
    name: 'prescriptions',
    type: relationshipTypes.MANY
  }
];

export default standardize({ properties, relationships, Model });
