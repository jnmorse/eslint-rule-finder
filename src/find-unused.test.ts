import { resolve } from 'path';
import LoadConfig from './load-config';
import findUnused from './find-unused';

const configFile: string = resolve(
  __dirname,
  './test-fixutes/withoutPlugins.js'
);

describe('findUnused()', () => {
  let config: LoadConfig;

  beforeAll(() => {
    config = new LoadConfig(configFile);
  });

  test('finds unused rules', () => {
    const unusedRules = findUnused(config);

    expect(unusedRules.size).toBeLessThan(266);
    expect(unusedRules.size).toBeGreaterThanOrEqual(253);
  });

  test('finds unused rules that are deprecated', () => {
    const unusedRules = findUnused(config, true);

    expect(unusedRules.size).toBeGreaterThanOrEqual(263);
    expect(unusedRules.size).toBeLessThan(266);
  });
});
