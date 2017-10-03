#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const { version } = require('../package.json');
const RuleFinder = require('../index');

// Set up options
program.version(version);
program.description('cli for getting eslint rules');
program.option('-c, --current <file>', 'get current rules');
program.option('-u, --unused <file>', 'get unused rules');
program.option('-s, --save <file>', 'save output in markdown file');
program.option('-i, --include', 'include deprecated rules');
program.parse(process.argv);

if (program.current) {
  const rf = new RuleFinder(program.current);
  console.log(rf.getCurrent());
} else if (program.unused && program.save) {
  const rf = new RuleFinder(program.unused);
  const unused = rf.getUnused(program.include);

  let text = '## Unused Rules';

  let category = '';

  unused.forEach((rule) => {
    if (category !== rule.category) {
      // eslint-disable-next-line prefer-destructuring
      category = rule.category;

      text += `\n\n${category}\n\n`;
    }

    text += `- [ ] ${rule.name}\n`;
  });

  console.log(text);

  fs.writeFileSync(program.save, text, { encoding: 'utf-8', flag: 'w' });

  process.exit();
} else if (program.unused) {
  const rf = new RuleFinder(program.unused);
  const unused = rf.getUnused(program.include);

  if (unused.length) {
    console.error(unused.map(rule => rule.name));
    console.error(`expected ${unused.length} rules to be defined\n\n`);
    process.exit(1);
  } else {
    console.log('No unused rules! Good Job :)\n\n');
  }
}
