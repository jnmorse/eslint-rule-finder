const { CLIEngine, Linter } = require('eslint');
const path = require('path');
const {
  filter,
  orderBy,
  forEach
} = require('lodash');

function sortRules(rules) {
  const results = [];

  rules.forEach((value, key) => {
    results.push({
      name: key,
      ...value
    });
  });

  return orderBy(results, ['category', 'deprecated', 'name']);
}

class RuleFinder {
  constructor(configFile) {
    const cf = path.join(process.cwd(), configFile);

    const cli = new CLIEngine({
      useEslintrc: false,
      configFile: cf
    });

    const linter = new Linter();

    this.config = cli.getConfigForFile();
    this.eslintRules = linter.getRules();
    this.getPluginRules();
  }

  getPluginRules() {
    const { plugins } = this.config;

    forEach(plugins, (plugin) => {
      // eslint-disable-next-line
      const pluginConfig = require(`eslint-plugin-${plugin}`);

      forEach(pluginConfig.rules, (value, key) => {
        let category = plugin;

        if (value.meta.docs && value.meta.docs.category) {
          category += `/${value.meta.docs.category}`;
        }

        this.eslintRules.set(`${plugin}/${key}`, {
          ...value,
          meta: {
            ...value.meta,
            docs: {
              ...value.meta,
              category
            }
          }
        });
      });
    });
  }

  diffRules() {
    const { eslintRules, config } = this;

    const diff = new Map();

    eslintRules.forEach((value, key) => {
      console.log(key, value.meta);
      if (!config.rules.hasOwnProperty(key)) {
        diff.set(key, {
          deprecated: value.meta.deprecated || false,
          category: value.meta.docs.category,
          ...value
        });
      }
    });

    return diff;
  }

  getCurrent() {
    const { rules } = this.config;
    return sortRules(rules);
  }

  getUnused(includeDeprecated = false) {
    let rules = this.diffRules();
    rules = sortRules(rules);

    if (!includeDeprecated) {
      rules = filter(rules, rule => !rule.deprecated);
    }

    return rules;
  }
}

module.exports = RuleFinder;
