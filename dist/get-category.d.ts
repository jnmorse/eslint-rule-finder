import { Rule } from 'eslint';
declare function getCategory([key, value]: [string, Rule.RuleModule]): string;
export default getCategory;
