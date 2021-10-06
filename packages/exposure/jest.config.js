const tsconfig = require("./tsconfig.json");

module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  coverageReporters: ["text", "text-summary", "html"],
  collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"],
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsConfig: {
        ...tsconfig.compilerOptions,
        esModuleInterop: true
      }
    }
  }
};
