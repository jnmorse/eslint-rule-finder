import { CLIEngine, Rule, Linter } from 'eslint';
import path from 'path';

const pack = require(`${path.join(process.cwd(), 'package.json')}`);

export interface CurrentRuleDefintion {
  config: Linter.RuleLevel | Linter.RuleLevelAndOptions;
  definition: Rule.RuleModule;
}

export class RuleFinder extends CLIEngine {
  public currentRules: Map<string, CurrentRuleDefintion> = new Map();

  constructor(configFile?: string) {
    super({
      useEslintrc: false,
      configFile: configFile || pack.main,
      cwd: process.cwd()
    });

    const rules = this.getRules();
    const { rules: configRules } = this.getConfigForFile(
      configFile || pack.main
    );

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

  private isDeprecated(rule: Rule.RuleModule): boolean {
    if (rule.meta && rule.meta.deprecated) {
      return true;
    }

    return false;
  }

  get deprecated(): Map<string, CurrentRuleDefintion> {
    const deprecatedRules: Map<string, CurrentRuleDefintion> = new Map();

    this.currentRules.forEach((value, rule) => {
      const { definition } = value;
      if (definition && definition.meta && definition.meta.deprecated) {
        deprecatedRules.set(rule, value);
      }
    });

    return deprecatedRules;
  }
}
