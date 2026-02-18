/* eslint-env jest */
jest.mock('react-native', () => ({
  NativeModules: {
    LinkIO: {
      configure: jest.fn(),
      trackReferral: jest.fn(() => Promise.resolve()),
      checkPendingLink: jest.fn(() => Promise.resolve()),
      handleURL: jest.fn(),
    },
  },
  NativeEventEmitter: jest.fn(() => ({
    addListener: jest.fn(() => ({
      remove: jest.fn(),
    })),
  })),
  Platform: {
    select: jest.fn((obj) => obj.default),
  },
}));
