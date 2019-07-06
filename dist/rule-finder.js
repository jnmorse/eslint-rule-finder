"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eslint_1 = require("eslint");
const path_1 = __importDefault(require("path"));
const pack = require(`${path_1.default.join(process.cwd(), 'package.json')}`);
class RuleFinder extends eslint_1.CLIEngine {
    constructor(configFile) {
        super({
            useEslintrc: false,
            configFile: configFile || pack.main,
            cwd: process.cwd()
        });
        this.currentRules = new Map();
        const rules = this.getRules();
        const { rules: configRules } = this.getConfigForFile(configFile || pack.main);
        if (configRules) {
            Object.keys(configRules).forEach(rule => {
                const definition = rules.get(rule);
                if (definition) {
                    this.currentRules.set(rule, {
                        config: configRules[rule],
                        definition
                    });
                }
            });
        }
    }
    /**
     * Checks if a rule is deprecated or not
     *
     * @param {Rule.RuleModule} rule Rule to check if deprecated
     * @returns {boolean} true if deprecated
     */
    isDeprecated(rule) {
        if (rule.meta && rule.meta.deprecated) {
            return true;
        }
        return false;
    }
    /**
     * Return all the rules from ESLint and plugins
     *
     * @param {boolean} includeDeprecated include deprecated rules?
     * @returns {Map<string, Rule.RuleModule>} Map containing the rules
     */
    getRules(includeDeprecated = true) {
        const rules = super.getRules();
        return new Map(Array.from(rules).filter(([name, rule]) => includeDeprecated === this.isDeprecated(rule) ||
            !this.isDeprecated(rule)));
    }
    /**
     * Return all rules not contained the configuration
     *
     * @param {boolean} includeDeprecated include deprecated rules?
     * @returns {Map<string, Rule.RuleModule>} Map containg undefined rules
     */
    getUndefinedRules(includeDeprecated = false) {
        const rules = this.getRules();
        const undefinedRules = new Map();
        rules.forEach((rule, name) => {
            if (!this.currentRules.has(name) &&
                this.isDeprecated(rule) === includeDeprecated) {
                undefinedRules.set(name, rule);
            }
            else if (!this.currentRules.has(name) && !this.isDeprecated(rule)) {
                undefinedRules.set(name, rule);
            }
        });
        return undefinedRules;
    }
    /**
     * All Rules that have been deprecated
     * @readonly
     */
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
RuleFinder.version = require(`${__dirname}/../package.json`)
    .version;
exports.RuleFinder = RuleFinder;
