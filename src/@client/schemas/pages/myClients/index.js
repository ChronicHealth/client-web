// @flow
import { relationshipTypes } from 'normer';
import Model, { properties } from '@client/models/pages/MyClient';
import { standardizePage } from '@client/utils/schemas';

const relationships = [
  {
    name: 'clients',
    type: relationshipTypes.MANY
  }
];

export default standardizePage('myClients', {
  Model,
  properties,
  relationships
});
