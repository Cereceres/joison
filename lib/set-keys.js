const { keys } = Object;

module.exports = (schema, properties, required, parser) => schema
    .keys(
        keys(properties)
            .reduce((store, prop) => {
                if (!properties[prop]) return store;

                store[prop] = parser(properties[prop]);
                if (required.has(prop)) store[prop] = store[prop].required();
                if (required.has(prop)) store[prop] = store[prop].required();
                return store;
            }, {})
    );
