module.exports = {
    "setupFilesAfterEnv": ["<rootDir>/setupTests.js"],
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",
    "moduleFileExtensions": [
      "js",
      "jsx",
      "json",
      "node"
    ],
    "testPathIgnorePatterns": ["<rootDir>/.next/", "<rootDir>/node_modules/"]
  }