import { getUserData } from 'utils/Helper';
import { TOKEN_KEY, USER_DATA_KEY } from '../constants';
import { logout, userExists } from '../Helper';
import StorageService from '../StorageService';

describe('Helper', () => {
  test('getUserData user exists', () => {
    StorageService.set(TOKEN_KEY, 'tokenvalue', {
      stringify: true,
      hash: true,
    });
    StorageService.set(USER_DATA_KEY, 'uservalue');
    expect(getUserData()).toBe(StorageService.get(USER_DATA_KEY));
  });
  test('getUserData user not exists', () => {
    StorageService.clear();
    expect(getUserData()).toBe(false);
  });
  test('userExists user not exists', () => {
    StorageService.clear();
    expect(userExists()).toBe(false);
  });
  test('userExists user exists', () => {
    StorageService.set(TOKEN_KEY, 'tokenvalue');
    expect(userExists()).toBe(true);
  });
  test('logout', () => {
    StorageService.set(TOKEN_KEY, 'tokenvalue');
    logout();
    expect(userExists()).toBe(false);
  });
});
