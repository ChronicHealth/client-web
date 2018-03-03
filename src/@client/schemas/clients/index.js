// @flow
import { relationshipTypes } from 'normer';
import { standardize } from '@client/utils/schemas';
import Model, { properties } from '@client/models/Client';

const relationships = [];

export default standardize({ properties, relationships });
