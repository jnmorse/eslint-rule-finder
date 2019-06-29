"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const fs = require('fs');
function saveCurrentRules(file = './docs/current-rules.md', currentRules) {
    const fileName = path.resolve(process.cwd(), file);
    let output = '# Current Rules\n\nCurrently Defined Rules\n\n';
    currentRules.forEach(({ config }, rule) => {
        output += `
## ${rule}

\`\`\`json
{
  "${rule}": ${JSON.stringify(config)}
}
\`\`\`
    `;
    });
    fs.writeFileSync(fileName, output);
}
exports.default = saveCurrentRules;
