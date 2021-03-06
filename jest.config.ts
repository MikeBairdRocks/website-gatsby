import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  collectCoverage: true,
  transform: {
    "^.+\\.tsx?$": `<rootDir>/.jest/jest-preprocess.js`,
  },
  moduleNameMapper: {
    '^gatsby-page-utils/(.*)$': 'gatsby-page-utils/$1',
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
    "~(.*)$": "<rootDir>/src/$1"
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/.jest/jest.loadershim.js`],
  testEnvironment: `jsdom`,
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};

export default config;