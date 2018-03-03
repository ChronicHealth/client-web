// @flow
import { createSelector } from 'reselect';
import { getBaseSelectors } from '@client/utils/selectors';
import Model from '@client/models/Scope';

const base = getBaseSelectors('scopes', new Model());

const scopes = createSelector([base.findEntity()], entity => entity.toList());

module.exports = {
  ...base,
  scopes,
  scopesJS: createSelector([scopes], listOfScopes => listOfScopes.toJS())
};
