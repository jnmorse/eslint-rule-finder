import { CurrentRuleDefintion } from './load-config';

const path = require('path');
const fs = require('fs');

function saveCurrentRules(
  file: string = './docs/current-rules.md',
  currentRules: Map<string, CurrentRuleDefintion>
) {
  const fileName: string = path.resolve(process.cwd(), file);

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

export default saveCurrentRules;
