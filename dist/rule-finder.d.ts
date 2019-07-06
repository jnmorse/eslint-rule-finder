import { CLIEngine, Rule, Linter } from 'eslint';
export interface CurrentRuleDefintion {
    config: Linter.RuleLevel | Linter.RuleLevelAndOptions;
    definition: Rule.RuleModule;
}
export declare class RuleFinder extends CLIEngine {
    static readonly version: string;
    currentRules: Map<string, CurrentRuleDefintion>;
    constructor(configFile?: string);
    /**
     * Checks if a rule is deprecated or not
     *
     * @param {Rule.RuleModule} rule Rule to check if deprecated
     * @returns {boolean} true if deprecated
     */
    private isDeprecated;
    /**
     * Return all the rules from ESLint and plugins
     *
     * @param {boolean} includeDeprecated include deprecated rules?
     * @returns {Map<string, Rule.RuleModule>} Map containing the rules
     */
    getRules(includeDeprecated?: boolean): Map<string, Rule.RuleModule>;
    /**
     * Return all rules not contained the configuration
     *
     * @param {boolean} includeDeprecated include deprecated rules?
     * @returns {Map<string, Rule.RuleModule>} Map containg undefined rules
     */
    getUndefinedRules(includeDeprecated?: boolean): Map<string, Rule.RuleModule>;
    /**
     * All Rules that have been deprecated
     * @readonly
     */
    readonly deprecated: Map<string, CurrentRuleDefintion>;
}
