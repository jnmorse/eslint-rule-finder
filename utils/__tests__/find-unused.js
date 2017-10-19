const path = require('path')
const LoadConfig = require('../load-config')
const findUnused = require('../find-unused')

const configFile = path.resolve(__dirname, '../__fixtures__/eslintrc.json')

let config

beforeEach(() => {
  config = new LoadConfig(configFile)
})

test('finds unused rules', () => {
  const unusedRules = findUnused(config)
  expect(unusedRules.size).toMatchSnapshot()
})

test('find unused rules that are deprecated', () => {
  const unusedRules = findUnused(config, true)
  expect(unusedRules.size).toMatchSnapshot()
})
