// @flow

export const transform = (opts: Object, trans: Object) => {
  return Object.keys(trans).reduce((finalResult, name) => {
    finalResult[name] = trans[name](opts[name]);
    return finalResult;
  }, opts);
};
