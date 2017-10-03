#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const { version } = require('../../package.json');
const RuleFinder = require('../lib/rule-finder');

// Set up options
program.version(version);
program.description('cli for getting eslint rules');
program.option('-c, --current <file>', 'get current rules');
program.option('-u, --unused <file>', 'get unused rules');
program.option('-s, --save <file>', 'save output in markdown file');
program.parse(process.argv);

if (program.current) {
  const rf = new RuleFinder(program.current);
  console.log(rf.current);
} else if (program.unused && program.save) {
  const rf = new RuleFinder(program.unused);
  const { unused } = rf;

  let text = '## Unused Rules';

  let category = '';

  for(const [key, value] of unused) {
    if (category !== value.category) {
      category = value.category;

      text += `\n\n${category}\n\n`;
    }

    text += `- [ ] ${key}\n`
  }

  console.log(text);

  fs.writeFileSync(program.save, text, { encoding: 'utf-8', flag: 'w' });

  process.exit();
} else if (program.unused) {
  const rf = new RuleFinder(program.unused);
  const unused = Array.from(rf.unused);

  console.log(unused);

  if (unused.length) {
    console.error(`expected ${unused.length} rules to be defined\n\n`);
    process.exit(1);
  }
}
