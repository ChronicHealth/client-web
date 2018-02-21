// @flow
import normalize from 'normer';
import { get } from 'lodash';

export default function(
  entityActionMap: Object,
  relationshipActionMap: Object,
  schema: Object
) {
  return (input, entityName, { startingSchema, options } = {}) => {
    const { entities, relationships } = normalize(
      input,
      entityName,
      schema,
      startingSchema
    );
    const entityActions = getEntityActions(
      entities,
      entityActionMap,
      get(options, 'entity')
    );
    const relationshipActions = getRelationshipActions(
      relationships,
      relationshipActionMap,
      get(options, 'relationship')
    );
    return entityActions.concat(relationshipActions);
  };
}

export const getEntityActions = (entities, entityActionMap, options) => {
  return Object.keys(entities).reduce((finalResult, entityName) => {
    const entityAction = entityActionMap[entityName];
    const entityMap = entities[entityName];
    const entityOptions = options ? options[entityName] || {} : {};
    return Object.keys(entityMap).reduce((fR, id) => {
      finalResult.push(
        entityAction[get(entityOptions, `${id}.actionName`, 'get')](
          entityMap[id]
        )
      );
      return finalResult;
    }, finalResult);
  }, []);
};

export const getRelationshipActions = (
  relationships,
  relationshipActionMap,
  options
) => {
  return Object.keys(relationships).reduce((finalResult, entityName) => {
    const entityOptions = options ? options[entityName] || {} : {};
    const relationshipAction = relationshipActionMap[entityName];
    const relationshipMap = relationships[entityName];
    return Object.keys(relationshipMap).reduce((fR, relationshipName) => {
      const relationshipOptions = entityOptions
        ? entityOptions[relationshipName] || {}
        : {};
      const entityMap = relationshipMap[relationshipName];
      return Object.keys(entityMap).reduce((fFR, id) => {
        fFR.push(
          relationshipAction[
            get(relationshipOptions, `${id}.actionName`, 'create')
          ](relationshipName, id, entityMap[id])
        );
        return fFR;
      }, fR);
    }, finalResult);
  }, []);
};
