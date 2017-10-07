const sortRules = require('../utils/sort-rules');
const { expect } = require('chai');
const { CLIEngine } = require('eslint');

describe('sortRules', () => {
  it('sorts rules', () => {
    const cli = new CLIEngine({
      rules: {
        semi: 'error',
        curly: 'error'
      }
    });
    const sortedRules = sortRules(cli.linter.getRules());
    expect(sortedRules.size).to.equal(254);

    const keys = [...sortedRules.keys()];

    // Check that first five rules are what they are supposed to be
    expect(keys.splice(0, 5)).to.deep.equal([
      'accessor-pairs',
      'array-callback-return',
      'block-scoped-var',
      'class-methods-use-this',
      'complexity'
    ]);
  });
});
