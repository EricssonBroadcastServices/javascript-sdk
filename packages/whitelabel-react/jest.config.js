module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testPathIgnorePatterns: ["/node_modules/"],
  testRegex: "(.spec).(ts|tsx|js)",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
