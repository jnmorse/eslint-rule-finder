"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eslint_1 = require("eslint");
const path_1 = __importDefault(require("path"));
const pack = require(`${path_1.default.join(process.cwd(), 'package.json')}`);
const sort_rules_1 = __importDefault(require("./sort-rules"));
class LoadConfig {
    constructor(configFile) {
        this.rules = new Map();
        this.currentRules = new Map();
        let cwd = process.cwd();
        let cli = null;
        if (configFile) {
            cwd = path_1.default.dirname(configFile);
            cli = new eslint_1.CLIEngine({
                useEslintrc: false,
                configFile,
                cwd
            });
        }
        else {
            cli = new eslint_1.CLIEngine({
                configFile: pack.main,
                cwd
            });
        }
        this.rules = sort_rules_1.default(cli.getRules());
        const { rules } = cli.getConfigForFile(configFile || pack.main);
        this.currentRules = new Map();
        if (rules) {
            Object.keys(rules).forEach(rule => {
                const definition = this.rules.get(rule);
                if (definition) {
                    this.currentRules.set(rule, {
                        config: rules[rule],
                        definition
                    });
                }
                else {
                    // eslint-disable-next-line no-console
                    throw new Error(`definition for ${rule} does not exist`);
                }
            });
        }
    }
    get deprecated() {
        const deprecatedRules = new Map();
        this.currentRules.forEach((value, rule) => {
            const { definition } = value;
            if (definition && definition.meta && definition.meta.deprecated) {
                deprecatedRules.set(rule, value);
            }
        });
        return deprecatedRules;
    }
}
exports.default = LoadConfig;
