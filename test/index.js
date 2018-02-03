const assert = require('assert');

const joison = require('../index');
const joi = require('joi');


describe('test to joison', () => {
    it('should parse the json and return a schema valid', () => {
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
    });

    it('should parse the json and return a schema valid', () => {
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
    });

    it('should parse the json and return a schema valid', () => {
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
    });

    it('should parse the json and return a schema valid', () => {
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
    });

    it('should parse the json and return a schema valid', () => {
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
    });

    it('should parse the json and return a schema valid', () => {
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
    });

    it('should parse the json and return a schema valid', () => {
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
    });

    it('should parse the json and return a schema valid', () => {
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
        console.log('error ', error);
        assert(error);
    });

    it('should parse the json and return a schema valid', () => {
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
    });

    it('should parse the json and return a schema valid', () => {
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
    });

    it('should parse the json and return a schema valid', () => {
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
    });
});
