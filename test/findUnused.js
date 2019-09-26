const path = require('path');
const { assert } = require('chai');
const { LoadConfig, findUnused } = require('../dist/index');

const configFile = path.resolve(__dirname, './fixtures/withoutPlugins.js');

describe('loadConfig', () => {
  let config;

  before(() => {
    config = new LoadConfig(configFile);
  });

  it('finds unused rules', () => {
    const unusedRules = findUnused(config);
    assert.equal(unusedRules.size, 257);
  });

  it('finds unused rules that are deprecated', () => {
    const unusedRules = findUnused(config, true);
    assert.equal(unusedRules.size, 267);
  });
});
