import { resolve } from 'path';
import fs from 'fs';

import { RuleFinder } from './rule-finder';
import saveCurrentRules from './save-current-rules';

const configFile = resolve(__dirname, './test-fixutes/withoutPlugins.js');
const fileName = 'test.md';

describe('saveCurrentRules()', () => {
  let loadConfig: RuleFinder;

  beforeEach(() => {
    loadConfig = new RuleFinder(configFile);
  });

  afterEach(() => {
    fs.unlinkSync(fileName);
  });

  test('should save rules', () => {
    saveCurrentRules(fileName, loadConfig.currentRules);
    const stats = fs.statSync('test.md');
    const fileContents: string = fs.readFileSync(fileName, {
      encoding: 'utf-8'
    });

    expect(stats.isFile()).toBeTruthy();
    expect(stats.size).toBeGreaterThan(0);
    expect(fileContents).toMatchSnapshot();
  });
});
