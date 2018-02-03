const joi = require('joi');
const setKeys = require('./lib/set-keys');
const parseOptions = require('./lib/parse-options');

const parser = module.exports = (json) => {
    const {
        __$type,
        __$properties,

        __$items = [],
        __$options = {},
    } = json;

    let { __$required = [] } = json;
    let currentRequired = null;

    if (typeof __$required === 'boolean') {
        currentRequired = __$required;
        __$required = [];
    }
    const required = new Set(__$required);
    let schema = typeof joi[__$type] === 'function' ? joi[__$type]() : json;

    if (currentRequired && schema.required) schema = schema.required();

    if (schema.keys && __$properties) schema = setKeys(
        schema,
        __$properties,
        required,
        parser
    );

    if (schema.items) schema = schema.items(__$items.map(parser));

    return parseOptions(schema, __$options);
};


