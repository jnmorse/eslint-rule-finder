function getCategory([key, value]) {
  const [name, pluginRuleName] = key.split('/')

  if (pluginRuleName) {
    return name // use name for category if a plugin rule
  }

  return value.meta.docs.category || 'none'
}

module.exports = getCategory
