import LoadConfig from './load-config';
import { Rule } from 'eslint';
declare function findUnused(loadedConfig: LoadConfig, includeDeprecated?: boolean): Map<string, Rule.RuleModule>;
export default findUnused;
