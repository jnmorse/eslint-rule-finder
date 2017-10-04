const LoadConfig = require('./load-config');

function findUnused(file, includeDeprecated) {
  const loadedConfig = new LoadConfig(file);
  const { rules, currentRules } = loadedConfig;

  const unused = new Map();

  rules.forEach((value, key) => {
    if (!currentRules.has(key)) {
      if (!includeDeprecated && value.meta.deprecated) {
        return;
      }

      unused.set(key, value);
    }
  });

  return unused;
}

module.exports = findUnused;
