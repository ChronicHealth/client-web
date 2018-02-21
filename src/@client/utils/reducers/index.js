// @flow
import { relationshipTypes } from 'normer';
import { Map } from 'immutable';
import { defaultScopeReducers } from 'noredux';
import { noreduxActionBatch } from 'redux-noredux';
import { OrderedSet } from 'immutable';
import mergeDeepOverwriteList from './mergeDeepOverwriteList';

type $$entity = Object;
type $$state = Map<string, any>;

const update = (state, entity, modelFunc) => {
  return state.updateIn([entity.id], previousEntity => {
    if (previousEntity) {
      return previousEntity.mergeDeepWith(mergeDeepOverwriteList, entity);
    }
    return modelFunc(entity);
  });
};

export const baseEntityReducer = (modelFunc: Function) => ({
  create: (entity: $$entity) => (state: $$state) => {
    return state.setIn([entity.id], modelFunc(entity));
  },
  update: (entity: $$entity) => (state: $$state) =>
    update(state, entity, modelFunc),
  get: (entity: $$entity) => (state: $$state) =>
    update(state, entity, modelFunc),
  del: (id: $$id) => (state: $$state) => {
    return state.deleteIn([id]);
  },
  index: (entities: $$entity[]) => (state: $$state) => {
    return entities.reduce((finalResult, entity) => {
      return update(finalResult, entity, modelFunc);
    }, state);
  }
});

export const relationshipCreate = (
  valueFunc: Function,
  name: string,
  id: $$id,
  value: $$id | $$id[],
  state: $$state
) => state.setIn([name, id], valueFunc(name, value, id));

export const baseRelationshipReducer = (valueFunc: Function) => ({
  create: (name: string, id: $$id, value: $$id | $$id[]) => (state: $$state) =>
    relationshipCreate(valueFunc, name, id, value, state),
  add: (name: string, id: $$id, value: $$id | $$id[]) => (state: $$state) => {
    return state.updateIn([name, id], previousRelationship => {
      if (previousRelationship) {
        return previousRelationship.add(value);
      }
      return valueFunc(name, value, id);
    });
  },
  remove: (name: string, id: $$id, value: $$id | $$id[]) => (
    state: $$state
  ) => {
    return state.updateIn([name, id], previousRelationship => {
      return previousRelationship.remove(value);
    });
  },
  index: (name, idValuePairs) => state => {
    return Object.keys(idValuePairs).reduce((finalResult, id) => {
      return relationshipCreate(
        valueFunc,
        name,
        id,
        idValuePairs[id],
        finalResult
      );
    }, state);
  },
  concat: (name: string, id: $$id, value: $$id | $$id[]) => (
    state: $$state
  ) => {
    return state.updateIn([name, id], previousRelationship => {
      if (previousRelationship) {
        return previousRelationship.concat(value);
      }
      return valueFunc(name, value, id);
    });
  }
});

export const getRelationship = (relationship: Object) => {
  if (relationship.type === relationshipTypes.ONE) {
    return value => value;
  }
  return value => {
    if (Array.isArray(value)) {
      return new OrderedSet(value);
    }
    return new OrderedSet([value]);
  };
};

export const entityReducer = (name: string, modelFunc: Function) =>
  noreduxActionBatch(
    defaultScopeReducers(`er.entities.${name}`, baseEntityReducer(modelFunc))
  );
export const relationshipReducer = (name: string, valueFunc: Function) =>
  noreduxActionBatch(
    defaultScopeReducers(
      `er.relationships.${name}`,
      baseRelationshipReducer(valueFunc)
    )
  );
export const getValueFunc = (schema: Object) => {
  const valueFuncsByRelationshipName = schema.relationships.reduce(
    (finalResult, relationship) => {
      finalResult[relationship.name] = getRelationship(relationship);
      return finalResult;
    },
    {}
  );
  return (name: string, value: $$id | $$id[], id: $$id) => {
    return valueFuncsByRelationshipName[name](value);
  };
};
