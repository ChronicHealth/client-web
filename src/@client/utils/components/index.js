// @flow
import * as React from 'react';
import { flowRight } from 'lodash';
import Yup from 'yup';
import { UL, ULItem } from '../../../ui-kit';

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

export function removeItemFromArray<X>(item: X, array: Array<X>) {
  const index = array.indexOf(item);
  const nextValues = [...array];
  nextValues.splice(index, 1);
  return nextValues;
}

export class ShowMulti extends React.PureComponent<Object> {
  render() {
    const { props } = this;
    if (!props.values.size) {
      return null;
    }
    return (
      <div>
        <h3>{props.title}</h3>
        <UL>
          {props.values.map((value, i) => {
            return <ULItem key={i} caption={value} />;
          })}
        </UL>
      </div>
    );
  }
}
