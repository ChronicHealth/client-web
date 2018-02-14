// @flow
import { createSelector } from 'reselect';
import { OrderedSet, Map } from 'immutable';

const defaultOrderedSet = new OrderedSet();
const defaultMap = new Map();

const getEntities = state => state.er.entities;
const getRelationships = state => state.er.relationships;

const defaultIdSelector = (state, props) => props.id;
const defaultIdsSelector = (state, props) => props.ids;

export const getBaseSelectors = (name: string, defaultModel: any) => {
  const getEntity = (state: Object) => getEntities(state)[name];
  const getRelationship = (relationshipName: string) => (state: Object) =>
    getRelationships(state)[name].get(relationshipName, defaultMap);
  return {
    findEntity: () => getEntity,
    findRelationship: getRelationship,
    find: (idSelector?: $$selector<$$id> = defaultIdSelector) => (
      state: Object,
      props: Object
    ) => getEntity(state).get(idSelector(state, props), defaultModel),
    get: (idSelectors?: $$selector<$$id[]> = defaultIdsSelector) =>
      createSelector([getEntity, idSelectors], (entity, ids) => {
        return ids.map(id => entity.get(id, defaultModel));
      }),
    findRelated: (
      relationshipName: string,
      idSelector?: $$selector<$$id> = defaultIdSelector
    ) => {
      const getRelationship = state =>
        getRelationships(state)[name].get(relationshipName, defaultMap);
      return (state: Object, props: Object) =>
        getRelationship(state).get(idSelector(state, props), '');
    },
    getRelated: (
      relationshipName: string,
      idSelector?: $$selector<$$id> = defaultIdSelector
    ) => {
      const getRelationship = state =>
        getRelationships(state)[name].get(relationshipName, defaultMap);
      return createSelector(
        [getRelationship, idSelector],
        (relationship, id) => {
          return relationship.get(id, defaultOrderedSet).toList();
        }
      );
    }
  };
};

export const getBaseSelectorsPage = (name: string, defaultModel: any) => {
  const baseSelectors = getBaseSelectors('pages', defaultModel);
  const idSelector = () => name;
  return {
    find: () => baseSelectors.find(idSelector),
    findRelated: (relationshipName: string) =>
      baseSelectors.findRelated(relationshipName, idSelector),
    getRelated: (relationshipName: string) =>
      baseSelectors.getRelated(relationshipName, idSelector)
  };
};
