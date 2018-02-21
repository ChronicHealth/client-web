// @flow

import { flowRight } from 'lodash';
import Yup from 'yup';

export { flowRight, Yup };

type $dispatching =
  | Object
  | $$anyArgumentFunction<$$returnDispatchFunction<$$dispatch>>;

export function bindActionCreators<
  R: $dispatching,
  $obj: { [key: string]: Function }
>(obj: $obj, dispatch: $$dispatch): $ObjMapi<$obj, <R, K>(k: K) => R> {
  return Object.keys(obj).reduce((finalResult, key) => {
    finalResult[key] = (...args) => dispatch(obj[key](...args));
    return finalResult;
  }, {});
}
