// @flow
import { properties } from '@client/models/User';
import { standardize } from '@client/utils/schemas';

const relationships = [
  {
    name: 'prescriptionGroups'
  }
];

export default standardize({ properties, relationships });
