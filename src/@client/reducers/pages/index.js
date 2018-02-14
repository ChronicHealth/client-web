// @flow
import pagesSchema from '@client/schemas/pages';
import {
  entityReducer,
  relationshipReducer,
  getValueFunc
} from '@client/utils/reducers';

const valueFuncByPage = Object.keys(pagesSchema).reduce(
  (finalResult, pageName) => {
    finalResult[pageName] = getValueFunc(pagesSchema[pageName]);
    return finalResult;
  },
  {}
);

const valueFunc = (name, value, id) => {
  return valueFuncByPage[id](name, value);
};

const modelFuncByPage = Object.keys(pagesSchema).reduce(
  (finalResult, pageName) => {
    const Model = pagesSchema[pageName].Model;
    finalResult[pageName] = ent => new Model(ent);
    return finalResult;
  },
  {}
);

const modelFunc = ent => {
  return modelFuncByPage[ent.id](ent);
};

export const relationship = {
  ...relationshipReducer('pages', valueFunc)
};

export const entity = {
  ...entityReducer('pages', modelFunc)
};

export const initialState = {};
