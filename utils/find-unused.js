const isDeprecated = rule => rule.meta && rule.meta.deprecated;

function findUnused(loadedConfig, includeDeprecated) {
  const { rules, currentRules } = loadedConfig;

  const unused = new Map();

  rules.forEach((value, key) => {
    if (!currentRules.has(key)) {
      if (!includeDeprecated && isDeprecated(value)) {
        return;
      }

      unused.set(key, value);
    }
  });

  return unused;
}

module.exports = findUnused;
