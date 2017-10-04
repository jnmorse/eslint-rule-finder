const { CLIEngine } = require('eslint');
const path = require('path');

const cwd = process.cwd();

class LoadConfig {
  constructor(file) {
    let configFile = '';
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const pkgConfig = require(path.join(cwd, 'package.json'));

    if (file !== true) {
      configFile = path.join(cwd, file);
    } else {
      configFile = pkgConfig.main;
    }

    const cli = new CLIEngine({
      useEslintRc: false,
      cwd,
      configFile
    });

    // Not sure this is ment to work, but it does so leaving it for now.
    // Attempts to use Linter does not include plugin rules
    this.eslintRules = cli.linter.getRules();
    // eslint-disable-next-line import/no-dynamic-require, global-require
    this.config = require(configFile);
  }

  get rules() {
    return this.eslintRules;
  }

  get currentRules() {
    const rules = new Map();

    Object.keys(this.config.rules).forEach((rule) => {
      const definition = this.eslintRules.get(rule);

      rules.set(rule, definition);
    });

    return rules;
  }
}

module.exports = LoadConfig;
