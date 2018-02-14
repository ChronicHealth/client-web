// @flow

import { batchActions } from 'redux-batched-actions';
import { entities, relationships } from '@client/reducers/er';
import schema from '@client/schemas';
import pagesSchema from '@client/schemas/pages';
import erAction from '@client/utils/erschemaAction';

const rawERFunc = erAction(entities, relationships, schema);

const erFunc = (...args) => batchActions(rawERFunc(...args));

export const erActions = (entityName: string) => {
  return {
    get: (input: Object, options?: Object) => {
      return erFunc(input, entityName, options);
    }
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
          reducer.create({
            id,
            ...values
          })
        );
        return id;
      });
    },
    update: (id: $$id, values: Object) => (dispatch: $$dispatch) => {
      return service.update(id).then(() => {
        dispatch(
          reducer.update({
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
    }
  };
};
