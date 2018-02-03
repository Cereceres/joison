const joi = require('joi');
const setKeys = require('./lib/set-keys');
const parseOptions = require('./lib/parse-options');

const parser = module.exports = (json) => {
    const {
        __$properties,
        __$items = [],
        __$options = {},
        __$args = [ ]
    } = json;
    let { __$type, __$required = [] } = json;
    let currentRequired = null;
    if (!__$type) return json;
    if (typeof joi[__$type] !== 'function') __$type = typeof json;

    if (typeof __$required === 'boolean') {
        currentRequired = __$required;
        __$required = [];
    }
    const required = new Set(__$required);
    let schema = joi[__$type](...__$args.map(parser));
    if (currentRequired && schema.required) schema = schema.required();
    const paramsToSetKey = [ schema, __$properties, required, parser ];

    if (schema.keys && __$properties) schema = setKeys(...paramsToSetKey);
    if (schema.items) schema = schema.items(__$items.map(parser));
    return parseOptions(schema, __$options, parser);
};


