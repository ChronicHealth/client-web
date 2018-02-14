// @flow
import { get } from 'lodash';

export const getParam = (name: string) => (state: Object, props: Object) =>
  get(props, `match.params.${name}`);
