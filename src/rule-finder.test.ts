import { RuleFinder } from './rule-finder';
import { resolve } from 'path';

const withPlugins = resolve(__dirname, './test-fixutes/withPlugin.js');
const withoutPlugins = resolve(__dirname, './test-fixutes/withoutPlugins.js');

describe('RuleFinder', () => {
  test('RuleFinder without plugins, should have all the base rules', () => {
    const ruleFinder = new RuleFinder(withoutPlugins);

    expect(ruleFinder.getRules().size).toBeGreaterThanOrEqual(200);
  });

  test('RuleFinder with a config including plugins, has more rules', () => {
    const ruleFinderWithPlugins = new RuleFinder(withPlugins);

    const ruleFinderWithoutPlugins = new RuleFinder(withoutPlugins);

    expect(ruleFinderWithPlugins.getRules().size).toBeGreaterThan(
      ruleFinderWithoutPlugins.getRules().size
    );
  });

  test('#getRules with includeDeprecated set to false should be less then then when true', () => {
    const ruleFinder = new RuleFinder(withoutPlugins);

    const includeDeprecated = ruleFinder.getRules(true);
    const noDeprecated = ruleFinder.getRules(false);

    expect(noDeprecated.size).toBeLessThan(includeDeprecated.size);
  });

  test('#currentRules should only contained the defined rules', () => {
    const currentConfig = require('./test-fixutes/withoutPlugins');
    const { currentRules } = new RuleFinder(
      resolve(__dirname, './test-fixutes/withoutPlugins.js')
    );

    expect(currentRules.size).toBe(3);
    expect(Array.from(currentRules.keys())).toEqual(
      expect.arrayContaining(Object.keys(currentConfig.rules))
    );
  });

  test('#deprecated should contain of list of any deprecated rules', () => {
    const { deprecated } = new RuleFinder(
      resolve(__dirname, './test-fixutes/withoutPlugins.js')
    );

    expect(deprecated.size).toBe(1);
    expect(deprecated.has('valid-jsdoc')).toBeTruthy();
  });
});

describe('#getUndefinedRules', () => {
  let config: RuleFinder;

  beforeAll(() => {
    config = new RuleFinder(withoutPlugins);
  });

  test('finds unused rules', () => {
    const unusedRules = config.getUndefinedRules(false);
    const allRules = config.getRules(false);

    expect(unusedRules.size).toBeLessThan(allRules.size);
  });

  test('finds unused rules that are deprecated', () => {
    const unusedRules = config.getUndefinedRules(true);
    const unusedRulesExcludeDeprecated = config.getUndefinedRules(false);
    const allRules = config.getRules(true);

    expect(unusedRules.size).toBeGreaterThanOrEqual(
      unusedRulesExcludeDeprecated.size
    );
    expect(unusedRules.size).toBeLessThan(allRules.size);
  });
});
