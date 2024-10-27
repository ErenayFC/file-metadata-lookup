module.exports = {
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.js"],
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest", {
      useESM: false,
      tsconfig: {
        allowJs: true,
        target: "es2017",
        module: "commonjs"
      }
    }]
  },
  moduleFileExtensions: ["ts", "js", "json", "node"]
};