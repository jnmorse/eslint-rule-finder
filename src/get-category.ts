import { Rule } from 'eslint';

function getCategory([key, value]: [string, Rule.RuleModule]) {
  const [name, pluginRuleName] = key.split('/');

  if (pluginRuleName) {
    return name; // use name for category if a plugin rule
  } else if (value.meta && value.meta.docs) {
    return value.meta.docs.category || 'none';
  }

  return 'none';
}

export default getCategory;
