"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isDeprecated = (rule) => rule.meta && rule.meta.deprecated ? true : false;
function findUnused(loadedConfig, includeDeprecated = false) {
    const { rules, currentRules } = loadedConfig;
    const unused = new Map();
    rules.forEach((value, key) => {
        if (!currentRules.has(key)) {
            if (!includeDeprecated && isDeprecated(value)) {
                return;
            }
            unused.set(key, value);
        }
    });
    return unused;
}
exports.default = findUnused;
