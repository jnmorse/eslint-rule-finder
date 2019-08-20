const { resolve } = require('path');
const { assert } = require('chai');

const { LoadConfig } = require('../dist/index');

describe('Load Config', () => {
  let config;

  before('invoke with new keyword', () => {
    config = new LoadConfig(resolve(__dirname, './fixtures/withoutPlugins.js'));
  });

  it('should be defined', () => {
    assert.isDefined(config);
  });

  it('should have all the rules', () => {
    const { rules } = config;

    assert.equal(rules.size, 267);
  });

  it('should have only currentRules', () => {
    const { currentRules } = config;

    assert.hasAllKeys(currentRules, ['curly', 'semi', 'valid-jsdoc']);
    assert.equal(currentRules.size, 3);
  });

  it('should return deprecated rules', () => {
    const { deprecated } = config;

    assert.equal(deprecated.size, 1);
    assert.equal(deprecated.has('valid-jsdoc'), true);
  });
});

describe('load config with plugins', () => {
  let config = null;

  before(() => {
    config = new LoadConfig(resolve(__dirname, './fixtures/withPlugin.js'));
  });

  it('should contain more then the base rules', () => {
    const { rules } = config;
    const expectedSize = 266;

    assert.isAbove(
      rules.size,
      expectedSize,
      `There should be more then ${expectedSize} rules`
    );
  });

  it('should have react/display-name set', () => {
    const { currentRules } = config;
    assert.hasAllKeys(
      currentRules,
      ['react/display-name'],
      'should only have react/display-name'
    );
    assert.doesNotHaveAllKeys(currentRules, ['react/button-has-type']);
  });
});
