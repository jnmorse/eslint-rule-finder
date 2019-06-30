import LoadConfig from './load-config';
import { Rule } from 'eslint';

const isDeprecated = (rule: Rule.RuleModule) =>
  rule.meta && rule.meta.deprecated ? true : false;

function findUnused(
  loadedConfig: LoadConfig,
  includeDeprecated: boolean = false
) {
  const { rules, currentRules } = loadedConfig;

  const unused: Map<string, Rule.RuleModule> = new Map();

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

export default findUnused;
