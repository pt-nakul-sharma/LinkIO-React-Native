module.exports = {
  preset: "react-native",
  modulePathIgnorePatterns: [
    "<rootDir>/example/node_modules",
    "<rootDir>/lib/",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: ["**/__tests__/**/*.test.ts?(x)"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/__tests__/**",
  ],
  transformIgnorePatterns: ["node_modules/(?!(@react-native|react-native)/)"],
  watchman: false,
};
