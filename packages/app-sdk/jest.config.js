// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsconfig = require("./tsconfig.json");

module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.[tj]sx?$": ["ts-jest", { isolatedModules: true }]
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  maxWorkers: "25%",
  collectCoverage: false,
  coverageReporters: ["text", "text-summary", "html"],
  collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"],
  globals: {
    "ts-jest": {
      tsconfig: tsconfig.compilerOptions
    }
  }
};
