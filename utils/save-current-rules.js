const path = require('path')
const fs = require('fs')

function saveCurrentRules(file = './docs/current-rules.md', currentRules) {
  const fileName = path.resolve(process.cwd(), file)

  const rulesToSave = Array.from(currentRules).map(([rule, definition]) => ({
    rule,
    definition
  }))

  let output = '# Current Rules\n\nCurrently Defined Rules\n\n'

  rulesToSave.forEach(({ rule, definition }) => {
    output += `
## ${rule}

\`\`\`json
{
  "${rule}": ${JSON.stringify(definition)}
}
\`\`\`
    `
  })

  fs.writeFileSync(fileName, output)
}

module.exports = saveCurrentRules
