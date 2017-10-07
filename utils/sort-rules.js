const { orderBy } = require('lodash');
const getCategory = require('./get-category');

function sortRules(rules) {
  const results = new Map();

  const toSort = [...rules.entries()].map((rule) => {
    const [key, value] = rule;

    const deprecated = value.meta.deprecated || false;
    const category = getCategory(rule);

    return{
      name: key,
      deprecated,
      category,
      ...value
    };
  });

  const orderedList = orderBy(toSort, ['deprecated', 'category', 'name'], 'asc');

  orderedList.forEach((rule) => {
    const item = rules.get(rule.name);

    results.set(rule.name, item);
  });

  return results;
}

module.exports = sortRules;
