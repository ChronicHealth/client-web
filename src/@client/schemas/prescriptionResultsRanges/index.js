// @flow
import { relationshipTypes } from 'normer';
import { formatDateRange } from '../../utils/prescriptionResults';
import { standardize } from '@client/utils/schemas';
import Model, { properties } from '@client/models/PrescriptionResultsRange';

const relationships = [];

export default standardize({
  properties,
  relationships,
  idFunc: ent => {
    return formatDateRange(ent);
  }
});
