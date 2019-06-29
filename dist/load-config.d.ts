import { Rule, Linter } from 'eslint';
export interface CurrentRuleDefintion {
    config: Linter.RuleLevel | Linter.RuleLevelAndOptions;
    definition: Rule.RuleModule;
}
declare class LoadConfig {
    rules: Map<string, Rule.RuleModule>;
    currentRules: Map<string, CurrentRuleDefintion>;
    constructor(configFile: string);
    readonly deprecated: Map<string, CurrentRuleDefintion>;
}
export default LoadConfig;
