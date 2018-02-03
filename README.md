# joison
parse to get joi schema from json schema

# install 

npm install --save joison
# Usage 

```js
const assert = require('assert');
const joison = require('joison');
const joi = require('joi');


const schema = joison({
    __$type:'object',
    __$properties:{
        test:{
            __$type: 'string'
        }
    }
});

const { error, value } = joi.validate({
    test:'test'
}, schema);

assert(!error);
assert.deepEqual(value, { test:'test' });

const schema = joison({
    __$type:'object',
    __$properties:{
        test:{
            __$type: 'string'
        }
    }
});

const { error } = joi.validate({
    test:[]
}, schema);
assert(error);

const schema = joison({
    __$type:'object',
    __$properties:{
        test:{
            __$type: 'array',
            __$items:[ {
                __$type:'number'
            } ]
        }
    }
});

const { error, value } = joi.validate({
    test:[ 1, 2 ]
}, schema);
assert(!error);
assert.deepEqual(value, { test:[ 1, 2 ] });

const schema = joison({
    __$type:'object',
    __$properties:{
        test:{
            __$type: 'array'
        }
    }
});

const { error, value } = joi.validate({
    test:[ 1, 'string' ]
}, schema);
assert(!error);
assert.deepEqual(value, { test:[ 1, 'string' ] });

const schema = joison({
    __$type:'object',
    __$properties:{
        test:{
            __$type: 'array',
            __$items:[ {
                __$type:'number'
            } ]
        }
    }
});

const { error } = joi.validate({
    test:[ 1, 'string' ]
}, schema);
assert(error);

const schema = joison({
    __$type:'object',
    __$properties:{
        test:{
            __$type: 'array',
            __$items:[ 1, 2 ]
        }
    }
});

const { error } = joi.validate({
    test:[ 1, 2 ]
}, schema);
assert(!error);

const schema = joison({
    __$type:'object',
    __$properties:{
        test:{
            __$type: 'array',
            __$items:[ 1, 2 ]
        }
    }
});

const { error } = joi.validate({
    test:[ 1, 3 ]
}, schema);
assert(error);

const schema = joison({
    __$type:'object',
    __$properties:{
        test:{
            __$type: 'array',
            __$items:[ 1, 2 ]
        },
        other:{
            __$type: 'array',
            __$items:[ 1, 2 ],
        }
    },
    __$required:[ 'other' ]
});

const { error } = joi.validate({
    test:[ 1, 2 ]
}, schema);
assert(error);

const schema = joison({
    __$type:'object',
    __$properties:{
        test:{
            __$type: 'array',
            __$items:[ 1, 2 ]
        },
        other:{
            __$type: 'array',
            __$items:[ 1, 2 ],
        }
    },
    __$required:[ 'other' ]
});

const { error } = joi.validate({
    test:[ 1, 2 ],
    other:[ 1, 2 ]
}, schema);
assert(!error);

const schema = joison({
    __$type:'object',
    __$properties:{
        test:{
            __$type: 'array',
            __$items:[ 1, 2 ]
        },
        other:{
            __$type: 'array',
            __$items: [ 1, 2, 3 ],
            __$options:{
                length: 3
            }
        }
    },
    __$required:[ 'other' ]
});

const { error } = joi.validate({
    test:[ 1, 2 ],
    other:[ 1, 2, 3 ]
}, schema);
assert(!error);

const schema = joison({
    __$type:'object',
    __$properties:{
        test:{
            __$type: 'array',
            __$items:[ 1, 2 ]
        },
        other:{
            __$type: 'array',
            __$items: [ 1, 2, 3, 4 ],
            __$options:{
                length: 3
            }
        }
    },
    __$required:[ 'other' ]
});

const { error } = joi.validate({
    test:[ 1, 2 ],
    other:[ 1, 2, 3, 4 ]
}, schema);
assert(error);
```

#API joison(json)-> joiSchema

the reserved word in json are:

__$type

__$items

__$properties

__$required

__$options

The __$options object'keys must to be method name for __$type given. The value of given keys is passed as parameter of method.

    Example:

    __$options:{
        length: 6
    }

to array type.
