// @flow
import { properties } from '@client/models/Prescription';
import { standardize } from '@client/utils/schemas';

const relationships = [
  {
    name: 'issues'
  }
];

export default standardize({ properties, relationships });
