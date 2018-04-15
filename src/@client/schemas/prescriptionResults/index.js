// @flow
import { standardize } from '@client/utils/schemas';
import { properties } from '@client/models/PrescriptionResult';
import { formatDate } from '@client/utils/prescriptionResults';

const relationships = [];

export default standardize({
  properties,
  relationships,
  idFunc: ent => formatDate(ent.date)
});
