const parser = require('../lib/parse-options');

const assert = require('assert');


describe('test to parse options', () => {
    it('should call the method with params right', (done) => {
        parser({
            method:(arg1, arg2) => {
                assert(arg1 === 1);
                assert(arg2 === 2);
                done();
            },
            done
        }, {
            method:[ 1, 2 ]
        }, (ident) => ident);
    });
});


