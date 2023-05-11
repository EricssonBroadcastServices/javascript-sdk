// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsconfig = require("./packages/exposure/tsconfig.json");

module.exports = {
  roots: ["<rootDir>/integration-tests"],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: false,
  coverageReporters: ["text", "text-summary", "html"],
  collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"],
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsconfig: {
        ...tsconfig.compilerOptions,
        esModuleInterop: true
      }
    }
  }
};
