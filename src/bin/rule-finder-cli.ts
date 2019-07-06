#!/usr/bin/env node

import program from 'commander';
import { RuleFinder } from '../rule-finder';
import { getUndefined } from './getUndefined';

program.version(RuleFinder.version);
program.description('CLI for Rule Finder');
program.option('-i, --include', 'Include deprecated rules');
program.option('-n, --no-errors', 'No Errors');

program
  .command('undefined [file]')
  .alias('undef')
  .description('Get undefined Rules')
  .action(file => {
    const { include, errors } = program;

    getUndefined(file, { includeDeprecated: include, showErrors: errors });
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
