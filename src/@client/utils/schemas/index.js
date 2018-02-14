// @flow
import { pick } from 'lodash';
import { relationshipTypes } from 'erschema';

export const standardize = (props: Object, overrideProps: Object = {}) => {
  return {
    ...props,
    modifier: ent => pick(ent, Object.keys(props.properties)),
    relationships: props.relationships.reduce((finalResult, relationship) => {
      finalResult.push({
        entityName: relationship.name,
        type: relationshipTypes.MANY,
        ...relationship
      });
      return finalResult;
    }, []),
    ...overrideProps
  };
};

export const standardizePage = (
  name: string,
  props: Object = {},
  overrideProps: Object = {}
) => {
  if (!props.Model && !overrideProps.Model)
    throw Error(`${name} page schema is missing Model`);
  return standardize({ ...props, idFunc: () => name }, overrideProps);
};
