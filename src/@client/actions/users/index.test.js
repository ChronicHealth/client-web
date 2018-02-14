// @flow
import { create } from './';
import jwt from 'jsonwebtoken';
import userService from '@client/services/users';
import fakeStore from 'tests/fakeStore';
import { getId } from 'tests';

jest.mock('@client/services/users', () => {
  let v;
  return {
    setVariables: variables => {
      v = variables;
    },
    create: jest.fn(() =>
      Promise.resolve({ session: v.token, user: { id: v.id } })
    )
  };
});

const token = jwt.sign({}, 'secretOrPrivateKey');
const id = getId();

describe('userActions', () => {
  beforeEach(() => {
    userService.setVariables({ token, id });
  });
  it('create', () => {
    const values = {
      username: 'exampleUsername',
      email: 'example@email.com'
    };
    return create(values)(fakeStore.dispatch).then(() => {
      const erState = fakeStore.getState().er;
      expect(erState.entities.users.getIn([id, 'id'])).toEqual(id);
      expect(erState.entities.pages.getIn(['sessions', 'token'])).toEqual(
        token
      );
      expect(erState.relationships.pages.getIn(['user', 'sessions'])).toEqual(
        id
      );
    });
  });
});
