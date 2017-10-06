const { expect } = require('chai');
const LoadConfig = require('../utils/load-config');

describe('LoadConfig', () => {
  it('loads rules properly', () => {
    const { rules } = new LoadConfig('test/eslintrc-fixtures.js');
    expect(rules.size).to.equal(254);
  });

  it('loads currentRules properly', () => {
    const { currentRules } = new LoadConfig('test/eslintrc-fixtures.js');
    expect(currentRules.size).to.equal(2);
    expect(currentRules.get('semi')).not.to.equal(undefined);
    expect(currentRules.get('curly')).not.to.equal(undefined);
  });
});
