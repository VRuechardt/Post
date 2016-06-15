'use strict';

var importTest = function(name, path){
    describe(name, function(){
        require(path);
    });
};

describe('server test', function(){
    process.env.NODE_ENV = 'test';

    //needed because app starts asynchronously
    before(function(done){
        require('../server/app');
        setTimeout(function () {
            done();
        }, 1800);
    });

    importTest('testing user endpoints', './test-modules/user.js');
});