"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCategory([key, value]) {
    const [name, pluginRuleName] = key.split('/');
    if (pluginRuleName) {
        return name; // use name for category if a plugin rule
    }
    else if (value.meta && value.meta.docs) {
        return value.meta.docs.category || 'none';
    }
    return 'none';
}
exports.default = getCategory;
