// @flow
import createNormerActionCreators from 'normer-actions';
import { batchActions } from 'redux-batched-actions';
import { entities, relationships } from '@client/reducers/er';
import schema from '@client/schemas';
import pagesSchema from '@client/schemas/pages';

const entityActionCreatorGenerator = entityName => entities[entityName];
const relationshipActionCreatorGenerator = entityName =>
  relationships[entityName];

const rawERFunc = createNormerActionCreators(
  entityActionCreatorGenerator,
  relationshipActionCreatorGenerator,
  schema
);

const erFunc = (...args) => batchActions(rawERFunc(...args));

export const erActions = (entityName: string) => {
  const get = (input: Object, options?: Object) => {
    return erFunc(input, entityName, options);
  };
  const index = (inputs: Object[], options?: Object) => {
    return batchActions(inputs.map(input => get(input, options)));
  };
  return {
    get,
    index
  };
};

export const pageERActions = (entityName: string) => {
  return {
    get: (input: Object, options: Object = {}) => {
      return erFunc(input, 'pages', {
        startingSchema: pagesSchema[entityName],
        ...options
      });
    }
  };
};

export const baseActions = (name: string, reducer: Object, service: Object) => {
  const er = erActions(name);
  return {
    create: (values: Object) => (dispatch: $$dispatch) => {
      return service.create(values).then(id => {
        dispatch(
          er.get({
            id,
            ...values
          })
        );
        return id;
      });
    },
    update: (id: $$id, values: Object) => (dispatch: $$dispatch) => {
      return service.update(id, values).then(() => {
        dispatch(
          er.get({
            id,
            ...values
          })
        );
        return id;
      });
    },
    get: (id: $$id) => (dispatch: $$dispatch) => {
      return service.get(id).then(entity => {
        if (entity) {
          dispatch(er.get(entity));
        }
        return entity;
      });
    },
    getBatch: (ids: $$id[]) => (dispatch: $$dispatch) => {
      if (!ids.length) {
        return Promise.resolve([]);
      }
      return service.getBatch(ids).then(entities => {
        if (entities) {
          dispatch(er.index(entities));
        }
        return entities;
      });
    },
    search: (input: string) => (dispatch: $$dispatch) => {
      return service.search(input).then(entities => {
        if (entities) {
          dispatch(er.index(entities));
        }
        return entities;
      });
    },
    index: () => (dispatch: $$dispatch) => {
      return service.index().then(entities => {
        if (entities) {
          dispatch(er.index(entities));
        }
        return entities;
      });
    }
  };
};
