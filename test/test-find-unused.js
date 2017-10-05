const findUnused = require('../utils/find-unused');
const { expect } = require('chai');

describe('findUnused', () => {
  it('finds unused rules', () => {
    const unusedRules = findUnused('test/eslintrc-fixtures.js');
    expect(unusedRules.size).to.equal(244);
  });
  it('finds unused rules that are deprecated', () => {
    const unusedRules = findUnused('test/eslintrc-fixtures.js', true);
    expect(unusedRules.size).to.equal(252);
  });
});
