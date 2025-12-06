const { createDefaultPreset } = require("ts-jest");
const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",

  transform: {
    ...tsJestTransformCfg,
  },

  testMatch: ["**/tests/**/*.test.ts"],

  modulePathIgnorePatterns: ["<rootDir>/dist/"],

  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },

  moduleFileExtensions: ["ts", "js", "json"],

  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],

  collectCoverage: true,
  collectCoverageFrom: ["src/modules/**/*.ts"],
  coverageDirectory: "coverage"
};
