import { CLIEngine, Rule, Linter } from 'eslint';
import path from 'path';

const pack = require(`${path.join(process.cwd(), 'package.json')}`);
import sortRules from './sort-rules';

export interface CurrentRuleDefintion {
  config?: Linter.RuleEntry;
  definition: Rule.RuleModule;
}

class LoadConfig {
  public rules: Map<string, Rule.RuleModule> = new Map();
  public currentRules: Map<string, CurrentRuleDefintion> = new Map();

  constructor(configFile: string) {
    let cwd = process.cwd();
    let cli = null;

    if (configFile) {
      cli = new CLIEngine({
        useEslintrc: false,
        configFile,
        cwd
      });
    } else {
      cli = new CLIEngine({
        useEslintrc: false,
        configFile: pack.main,
        cwd
      });
    }

    this.rules = sortRules(cli.getRules());

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
        } else {
          // eslint-disable-next-line no-console
          throw new Error(`definition for ${rule} does not exist`);
        }
      });
    }
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

export default LoadConfig;
