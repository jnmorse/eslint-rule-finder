const orderBy = require('lodash/orderBy')
const getCategory = require('./get-category')

const isDeprecated = rule => rule.meta && rule.meta.deprecated

function sortRules(rules) {
  const results = new Map()

  const toSort = Array.from(rules).map(rule => {
    const [key, value] = rule

    const deprecated = isDeprecated(value)
    const category = getCategory(rule)

    return {
      name: key,
      deprecated,
      category,
      ...value
    }
  })

  const orderedList = orderBy(toSort, ['deprecated', 'category', 'name'], 'asc')

  orderedList.forEach(rule => {
    const item = rules.get(rule.name)

    results.set(rule.name, item)
  })

  return results
}

module.exports = sortRules
