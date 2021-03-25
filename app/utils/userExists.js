/* eslint-disable no-unused-vars */
import { STORAGE_KEY } from './constants';
import StorageService from './StorageService';

export function userExists() {
  if (StorageService.exists(STORAGE_KEY)) {
    return true;
  }
  return false;
}
