import { CurrentRuleDefintion } from './load-config';
declare function saveCurrentRules(file: string | undefined, currentRules: Map<string, CurrentRuleDefintion>): void;
export default saveCurrentRules;
