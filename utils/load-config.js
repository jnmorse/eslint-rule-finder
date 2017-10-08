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
      configFile = path.join(cwd, pkgConfig.main);
    }

    const cli = new CLIEngine({
      useEslintrc: false,
      cwd,
      configFile
    });

    // Not sure this is ment to work, but it does so leaving it for now.
    // Attempts to use Linter does not include plugin rules
    this.eslintRules = cli.linter.getRules();

    const { rules } = cli.getConfigForFile();

    this.current = new Map();

    Object.keys(rules).forEach((rule) => {
      const definition = this.eslintRules.get(rule);

      this.current.set(rule, definition);
    });
  }

  get rules() {
    return this.eslintRules;
  }

  get currentRules() {
    return this.current;
  }
}

module.exports = LoadConfig;
