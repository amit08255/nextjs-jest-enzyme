module.exports = {
    "setupFilesAfterEnv": ["<rootDir>/setupTests.js"],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    preset: 'ts-jest',
    "globals": {
      "ts-jest": {
        babelConfig: true,
        diagnostics: false,
        tsConfig: "jest.tsconfig.json"
      }
    },
    "coveragePathIgnorePatterns": [
      "/node_modules/",
      "enzyme.js"
    ],
    "moduleNameMapper": {
      "components/(.*)": "<rootDir>/components/$1",
      "containers/(.*)": "<rootDir>/containers/$1",
      "app-types/(.*)": "<rootDir>/app-types/$1",
      "interfaces/(.*)": "<rootDir>/interfaces/$1",
      "utilities/(.*)": "<rootDir>/utilities/$1",
      "^constants/(.*)": "<rootDir>/constants/$1"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
      "tsx",
      "ts",
      "js",
      "jsx",
      "json",
      "node"
    ],
    "testPathIgnorePatterns": ["<rootDir>/.next/", "<rootDir>/node_modules/"]
  }