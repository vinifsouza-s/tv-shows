// jest.config.js
module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testEnvironment: "jsdom",
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.(scss|css)$": "jest-transform-stub", // Adiciona esta linha
  },
  moduleNameMapper: {
    "\\.(scss|css)$": "identity-obj-proxy", // Adiciona esta linha para mockar arquivos CSS/SCSS
  },
};
