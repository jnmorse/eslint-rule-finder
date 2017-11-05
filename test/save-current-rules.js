const { assert } = require('chai')
const path = require('path')
const fs = require('fs')

const { LoadConfig, saveCurrentRules } = require('../index')

const configFile = path.resolve(__dirname, './fixtures/.eslintrc.js')

describe('save current rules', () => {
  const { currentRules } = new LoadConfig(configFile)

  after(() => {
    fs.unlinkSync('test.md')
  })

  it('should save rules', () => {
    saveCurrentRules('test.md', currentRules)
    const stats = fs.statSync('test.md')

    assert.isTrue(fs.existsSync('test.md'))
    assert.isAbove(stats.size, 0)
  })
})
