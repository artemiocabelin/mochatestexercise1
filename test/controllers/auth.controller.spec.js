var assert = require('assert');
var authController = require('../../controllers/auth.controller');

// ---This beforeEach() will attach to the global describe and will run before any test runs
// beforeEach(function () {
//     console.log('running before each');
//     authController.setRoles(['user']);
// })

// to call test write in terminal: mocha './test/**/*.spec.js'
// or if you have the command in package.json already just run npm test

// .only  - if you want only this describe test to execute
// .skip  - if you want mocha to skip this test

describe('AuthController', function() {
    beforeEach(function settingUpRoles() {
        console.log('running before each');
        authController.setRoles(['user']);
    })
    // beforeEach('this function is erroring intentionally',function erroringFunction() {
    //     throw({error: 'error'});
    // })
    describe('isAuthorized', function() {
        it('Should return false if not authorized', function() {
            // this.skip if you want mocha to skip this 'it' test
            assert.equal(false, authController.isAuthorized('admin'));
        })
        it('Should return true if authorized', function() {
            authController.setRoles(['user','admin']);
            assert.equal(true, authController.isAuthorized('admin'));
        })
        it('should not allow get if not authorized')
        it('should allow get if authorized')
    })
    describe.only('isAuthorizedAsync', function() {
        it('Should return false if not authorized', function(done) {
            this.timeout(2500);
            authController.isAuthorizedAsync('admin', 
            function(isAuth) {
                assert.equal(false, isAuth);
                done();
            });
        })
    })
});