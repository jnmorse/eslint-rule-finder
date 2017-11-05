const fs = require('fs')
const path = require('path')

const LoadConfig = require('../load-config')
const saveCurrentRules = require('../save-current-rules')

const configFile = path.resolve(__dirname, '../__fixtures__/eslintrc.json')

afterAll(() => {
  fs.unlinkSync('test.md')
})

test('Should save rules', () => {
  const { currentRules } = new LoadConfig(configFile)

  saveCurrentRules('test.md', currentRules)

  expect(fs.existsSync('test.md')).toBe(true)
})
