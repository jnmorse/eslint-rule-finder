import { CLIEngine, Rule, Linter } from 'eslint';
import path from 'path';

const pack = require(`${path.join(process.cwd(), 'package.json')}`);

export interface CurrentRuleDefintion {
  config: Linter.RuleLevel | Linter.RuleLevelAndOptions;
  definition: Rule.RuleModule;
}

export class RuleFinder extends CLIEngine {
  public readonly version: string = require(`${__dirname}/../package.json`)
    .version;

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

  /**
   * Checks if a rule is deprecated or not
   *
   * @param {Rule.RuleModule} rule Rule to check if deprecated
   * @returns {boolean} true if deprecated
   */
  private isDeprecated(rule: Rule.RuleModule): boolean {
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
  public getRules(
    includeDeprecated: boolean = true
  ): Map<string, Rule.RuleModule> {
    const rules = super.getRules();

    return new Map(
      Array.from(rules).filter(
        ([name, rule]) =>
          includeDeprecated === this.isDeprecated(rule) ||
          !this.isDeprecated(rule)
      )
    );
  }

  /**
   * Return all rules not contained the configuration
   *
   * @param {boolean} includeDeprecated include deprecated rules?
   * @returns {Map<string, Rule.RuleModule>} Map containg undefined rules
   */
  public getUndefinedRules(
    includeDeprecated: boolean = false
  ): Map<string, Rule.RuleModule> {
    const rules = this.getRules();
    const undefinedRules = new Map<string, Rule.RuleModule>();

    rules.forEach((rule, name) => {
      if (
        !this.currentRules.has(name) &&
        this.isDeprecated(rule) === includeDeprecated
      ) {
        undefinedRules.set(name, rule);
      } else if (!this.currentRules.has(name) && !this.isDeprecated(rule)) {
        undefinedRules.set(name, rule);
      }
    });

    return undefinedRules;
  }

  /**
   * All Rules that have been deprecated
   * @readonly
   */
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
