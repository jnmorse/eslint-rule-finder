const { CLIEngine, Linter, ...eslint } = require('eslint');
const path = require('path');
const {
  filter,
  orderBy,
  forEach,
  difference
} = require('lodash');

class RuleFinder {
  constructor(configFile) {
    const cf = path.join(process.cwd(), configFile);

    const cli = new CLIEngine({
      cwd: process.cwd(),
      useEslintrc: false,
      configFile: cf
    });

    const linter = new Linter();

    this.config = cli.getConfigForFile();
    this.eslintRules = linter.getRules();
    this.pluginRules = new Map();
  }

  getPluginRules() {
    const { plugins } = this.config;

    forEach(plugins, (plugin) => {
      // eslint-disable-next-line
      const pluginConfig = require(`eslint-plugin-${plugin}`);

      forEach(pluginConfig.rules, (value, key) => {
        this.eslintRules.set(`${plugin}/${key}`, {
          deprecated: value.meta.deprecated || false,
          category: value.meta.docs && value.meta.docs.category ? value.meta.docs.category : plugin,
          ...value
        });
      });
    });
  }

  diffRules() {
    this.getPluginRules();
    const { eslintRules, config } = this;

    const diff = new Map();

    for (const [key, value] of eslintRules) {
      if (!config.rules.hasOwnProperty(key)) {
        diff.set(key, {
          deprecated: value.meta.deprecated || false,
          category: value.meta.docs.category,
          ...value
        });
      }
    }

    return diff;
  }

  get unused() {
    return this.diffRules();
  }
}

module.exports = RuleFinder;
