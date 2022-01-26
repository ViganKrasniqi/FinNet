let common = [
  'spec/cucumber/features/**/*.feature', // Specify feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require spec/cucumber/steps/**/*.ts', // Load step definitions
].join(' ');

module.exports = {
  default: common,
};
