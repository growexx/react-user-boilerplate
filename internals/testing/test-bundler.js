// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import '@babel/polyfill';
jest.mock('utils/firebase', () => ({
  signInWithGoogle: jest.fn(),
  signInWithFacebook: jest.fn(),
  signInWithMicrosoft: jest.fn(),
  auth: {
    onAuthStateChanged: jest.fn(),
  },
}));
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
