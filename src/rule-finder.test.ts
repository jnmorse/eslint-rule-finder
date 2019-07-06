import { RuleFinder } from './rule-finder';
import { resolve } from 'path';

describe('RuleFinder', () => {
  test('RuleFinder without plugins, should have all the base rules', () => {
    const ruleFinder = new RuleFinder(
      resolve(__dirname, './test-fixutes/withoutPlugins.js')
    );

    expect(ruleFinder.getRules().size).toBeGreaterThanOrEqual(200);
  });

  test('RuleFinder with a config including plugins, has more rules', () => {
    const withPlugins = new RuleFinder(
      resolve(__dirname, './test-fixutes/withPlugin.js')
    );

    const withoutPlugins = new RuleFinder(
      resolve(__dirname, './test-fixutes/withoutPlugins.js')
    );

    expect(withPlugins.getRules().size).toBeGreaterThan(
      withoutPlugins.getRules().size
    );
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
