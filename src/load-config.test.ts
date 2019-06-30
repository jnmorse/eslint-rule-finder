import LoadConfig from './load-config';
import { resolve } from 'path';

describe('LoadConfig', () => {
  test('LoadConfig without plugins, should have all the base rules', () => {
    const loadConfig = new LoadConfig(
      resolve(__dirname, './test-fixutes/withoutPlugins.js')
    );

    expect(loadConfig.rules.size).toBeGreaterThanOrEqual(200);
  });

  test('LoadConfig with a config including plugins, has more rules', () => {
    const withPlugins = new LoadConfig(
      resolve(__dirname, './test-fixutes/withPlugin.js')
    );

    const withoutPlugins = new LoadConfig(
      resolve(__dirname, './test-fixutes/withoutPlugins.js')
    );

    expect(withPlugins.rules.size).toBeGreaterThan(withoutPlugins.rules.size);
  });

  test('#currentRules should only contained the defined rules', () => {
    const currentConfig = require('./test-fixutes/withoutPlugins');
    const { currentRules } = new LoadConfig(
      resolve(__dirname, './test-fixutes/withoutPlugins.js')
    );

    expect(currentRules.size).toBe(3);
    expect(Array.from(currentRules.keys())).toEqual(
      expect.arrayContaining(Object.keys(currentConfig.rules))
    );
  });

  test('#deprecated should contain of list of any deprecated rules', () => {
    const { deprecated } = new LoadConfig(
      resolve(__dirname, './test-fixutes/withoutPlugins.js')
    );

    expect(deprecated.size).toBe(1);
    expect(deprecated.has('valid-jsdoc')).toBeTruthy();
  });
});
