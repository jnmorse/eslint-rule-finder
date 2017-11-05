const path = require('path')
const LoadConfig = require('../load-config')

const configFile = path.resolve(__dirname, '../__fixtures__/eslintrc.json')

test('LoadConfig should be used with new', () => {
  const config = new LoadConfig(configFile)

  expect(config).not.toBeUndefined()
})

test('LoadConfig should have the list of current rules', () => {
  const { currentRules } = new LoadConfig(configFile)

  expect(currentRules.get('curly')).not.toBeUndefined()
  expect(currentRules.get('semi')).not.toBeUndefined()
  expect(currentRules.size).toBe(2)
})

test('LoadConfig should have all the rules', () => {
  const { rules } = new LoadConfig(configFile)

  expect(rules).toMatchSnapshot()
})
