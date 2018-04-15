// @flow
import { getBaseSelectors } from '@client/utils/selectors';
import Model from '@client/models/Routine';
import { findRelated } from '@client/selectors/pages/homes';
import { createSelector } from 'reselect';
const base = getBaseSelectors('routines', new Model());

module.exports = {
  ...base,
  getDefaultRoutine: createSelector(
    [
      base.getRelated('prescriptions', findRelated('routine')),
      base.getRelated('bodyLevels', findRelated('routine'))
    ],
    (prescriptions, bodyLevels) => ({
      prescriptions,
      bodyLevels
    })
  )
};
