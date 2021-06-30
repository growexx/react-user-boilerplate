import { TOKEN_KEY, USER_DATA_KEY } from './constants';
import StorageService from './StorageService';

export function userExists() {
  if (StorageService.exists(TOKEN_KEY)) {
    return true;
  }
  return false;
}

/**
 * Get User Data
 * @returns
 */
export function getUserData() {
  if (StorageService.exists(TOKEN_KEY)) {
    return StorageService.get(USER_DATA_KEY);
  }
  return false;
}

/**
 * to logout user from system
 */
export function logout() {
  StorageService.clear();
}
