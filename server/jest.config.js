module.exports = {
  testEnvironment: "node",
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "controller/**/*.js",
    "lib/**/*.js",
    "validator/**/*.js",
    "!node_modules/**",
  ],
  testMatch: ["**/tests/**/*.test.js"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  verbose: true,
};
