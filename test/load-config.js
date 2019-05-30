const path = require('path')
const { assert } = require('chai')

const { LoadConfig } = require('../index')

const configFile = path.resolve(__dirname, './fixtures/.eslintrc.js')

describe('Load Config', () => {
  let config

  before('invoke with new keyword', () => {
    config = new LoadConfig(configFile)
  })

  it('should be defined', () => {
    assert.isDefined(config)
  })

  it('should have all the rules', () => {
    const { rules } = config

    assert.equal(rules.size, 266)
  })

  it('should have only currentRules', () => {
    const { currentRules } = config

    assert.hasAllKeys(currentRules, ['curly', 'semi', 'valid-jsdoc'])
    assert.equal(currentRules.size, 3)
  })

  it('should return deprecated rules', () => {
    const { deprecated } = config

    assert.equal(deprecated.size, 1)
    assert.equal(deprecated.has('valid-jsdoc'), true)
  })
})
