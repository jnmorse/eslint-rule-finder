import { Rule } from 'eslint';
import orderBy from 'lodash/orderBy';

import getCategory from './get-category';

const isDeprecated = (rule: Rule.RuleModule): boolean =>
  rule.meta && rule.meta.deprecated ? true : false;

function sortRules(rules: Map<string, Rule.RuleModule>) {
  const results = new Map();

  const toSort = Array.from(rules).map((rule: [string, Rule.RuleModule]) => {
    const [key, value] = rule;

    const deprecated = isDeprecated(value);
    const category = getCategory(rule);

    return {
      name: key,
      deprecated,
      category,
      ...value
    };
  });

  const orderedList = orderBy(
    toSort,
    ['deprecated', 'category', 'name'],
    'asc'
  );

  orderedList.forEach(rule => {
    const item = rules.get(rule.name);

    results.set(rule.name, item);
  });

  return results;
}

module.exports = sortRules;
