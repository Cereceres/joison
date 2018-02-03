const { keys } = Object;


module.exports = (schema, options, parser) => keys(options).reduce((_schema, option) => {
    if (typeof _schema[option] !== 'function') return _schema;

    const params = Array.isArray(options[option]) ?
        options[option] :
        [ options[option] ];
    const schemaRedefined = _schema[option](...params.map(parser));

    return schemaRedefined;
}, schema);


