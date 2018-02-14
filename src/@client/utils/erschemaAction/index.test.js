// @flow

import { getEntityActions, getRelationshipActions } from './';

describe('erschemaReducer', () => {
  describe('getEntityActions', () => {
    const entities = {
      users: {
        [1]: {
          name: 'John'
        }
      }
    };
    const entityActionMap = {
      users: {
        get: entity => ({ payload: entity })
      }
    };
    it('normal', () => {
      expect(getEntityActions(entities, entityActionMap)).toEqual([
        { payload: { name: 'John' } }
      ]);
    });
  });
  describe('getRelationshipActions', () => {
    const relationships = {
      users: {
        friends: {
          [1]: [2]
        }
      }
    };
    const relationshipActionMap = {
      users: {
        create: (name, id, value) => ({ payload: { name, id, value } }),
        concat: (name, id, value) => ({
          payload: { name, id, value },
          type: 'concat'
        })
      }
    };
    it('normal', () => {
      expect(
        getRelationshipActions(relationships, relationshipActionMap)
      ).toEqual([{ payload: { name: 'friends', id: '1', value: [2] } }]);
    });
    it('options', () => {
      expect(
        getRelationshipActions(relationships, relationshipActionMap, {
          users: { friends: { [1]: { actionName: 'concat' } } }
        })
      ).toEqual([
        { type: 'concat', payload: { name: 'friends', id: '1', value: [2] } }
      ]);
    });
  });
});
