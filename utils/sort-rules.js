const { orderBy } = require('lodash');

function sortRules(rules) {
  const toSort = [...rules.entries()].map((rule) => {
    const [key, value] = rule;
    let name = '';
    let plugin = false;

    const deprecated = value.meta.deprecated || false;
    let category = 'none';

    [plugin, name] = key.split('/');

    if (name) {
      const upper = ([first, ...rest]) => `${first.toUpperCase()}${rest.join('')}`;
      category = upper(plugin);
      name = `${plugin}/${name}`;
    } else {
      name = plugin;
    }

    if (value.meta.docs && value.meta.docs.category && category === 'none') {
      category = value.meta.docs.category;
      name = plugin;
    }

    return{
      name,
      deprecated,
      category,
      ...value
    };
  });

  const orderedList = orderBy(toSort, ['deprecated', 'category', 'name'], 'asc');

  return orderedList;
}

module.exports = sortRules;
