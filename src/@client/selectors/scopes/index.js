// @flow
import { createSelector } from 'reselect';
import { getBaseSelectors } from '@client/utils/selectors';
import Model from '@client/models/Scope';

const base = getBaseSelectors('scopes', new Model());

const scopes = createSelector([base.findEntity()], entity => entity.toList());

const scopeIds = createSelector([scopes], scopeList =>
  scopeList.map(s => s.id)
);

module.exports = {
  ...base,
  scopes,
  scopeIds,
  scopesJS: createSelector([scopes, (s, p) => p.default], (listOfScopes, def) =>
    (def
      ? listOfScopes.unshift({ id: '', name: 'Default' })
      : listOfScopes
    ).toJS()
  )
};
