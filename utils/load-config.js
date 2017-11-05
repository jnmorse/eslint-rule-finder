const { CLIEngine } = require('eslint')
const path = require('path')
// eslint-disable-next-line import/no-dynamic-require
const pack = require(`${path.join(process.cwd(), 'package.json')}`)
const sortRules = require('./sort-rules')

class LoadConfig {
  constructor(configFile) {
    let cwd = process.cwd()
    let cli = null

    if (configFile) {
      cwd = path.dirname(configFile)
      cli = new CLIEngine({
        useEslintrc: false,
        configFile,
        cwd
      })
    } else {
      cli = new CLIEngine({
        configFile: pack.main,
        cwd
      })
    }

    this.rules = cli.linter.getRules()
    this.rules = sortRules(this.rules)

    const { rules } = cli.getConfigForFile()

    this.currentRules = new Map()

    Object.keys(rules).forEach((rule) => {
      this.currentRules.set(rule, rules[rule])
    })
  }

  get deprecated() {
    const deprecatedRules = new Map()

    this.currentRules.forEach((definition, rule) => {
      if (rule.meta && rule.meta.deprecated) {
        deprecatedRules.set(rule, definition)
      }
    })

    return deprecatedRules
  }
}

module.exports = LoadConfig
