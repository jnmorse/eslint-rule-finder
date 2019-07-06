#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const rule_finder_1 = require("../rule-finder");
const getUndefined_1 = require("./getUndefined");
commander_1.default.version(rule_finder_1.RuleFinder.version);
commander_1.default.description('CLI for Rule Finder');
commander_1.default.option('-i, --include', 'Include deprecated rules');
commander_1.default.option('-n, --no-errors', 'No Errors');
commander_1.default
    .command('undefined [file]')
    .alias('undef')
    .description('Get undefined Rules')
    .action(file => {
    const { include, errors } = commander_1.default;
    getUndefined_1.getUndefined(file, { includeDeprecated: include, showErrors: errors });
});
commander_1.default.parse(process.argv);
if (!commander_1.default.args.length) {
    commander_1.default.help();
}
