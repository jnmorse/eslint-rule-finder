"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderBy_1 = __importDefault(require("lodash/orderBy"));
const get_category_1 = __importDefault(require("./get-category"));
const isDeprecated = (rule) => rule.meta && rule.meta.deprecated ? true : false;
function sortRules(rules) {
    const results = new Map();
    const toSort = Array.from(rules).map((rule) => {
        const [key, value] = rule;
        const deprecated = isDeprecated(value);
        const category = get_category_1.default(rule);
        return Object.assign({ name: key, deprecated,
            category }, value);
    });
    const orderedList = orderBy_1.default(toSort, ['deprecated', 'category', 'name'], 'asc');
    orderedList.forEach(rule => {
        const item = rules.get(rule.name);
        results.set(rule.name, item);
    });
    return results;
}
exports.default = sortRules;
