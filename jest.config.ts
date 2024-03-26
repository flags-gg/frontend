module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // add this if you've installed jest-dom
};
