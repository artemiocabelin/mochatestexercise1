var assert = require('assert');
var authController = require('../../controllers/auth.controller');
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');
chai.use(chaiAsPromised);
chai.should();

// ---This beforeEach() will attach to the global describe and will run before any test runs
// beforeEach(function () {
//     console.log('running before each');
//     authController.setRoles(['user']);
// })

// to call test write in terminal: mocha './test/**/*.spec.js'
// or if you have the command in package.json already just run npm test

// .only  - if you want only this describe test to execute
// .skip  - if you want mocha to skip this test

// sinon.spy() gives us a fake function. We can use to track a function
// sinon.stub() replaces a function. We can control its behavior directly. Use 
//      this when you want to prevent a function from talking to the database

// Mocks (and mock expectations) are fake methods (like spies) with pre-programmed behavior (like stubs)
// as well as pre-programmed expectations.

describe('AuthController', function() {
    beforeEach(function settingUpRoles() {
        console.log('running before each');
        // authController.setRoles(['user']);
    })
    // beforeEach('this function is erroring intentionally',function erroringFunction() {
    //     throw({error: 'error'});
    // })

    describe('isAuthorized', function() {
        var user = {};
        beforeEach(function() {
            user = {
                roles: ['user'],
                isAuthorized: function(neededRole) {
                    return this.roles.indexOf(neededRole) >= 0;
                }
            }

            sinon.spy(user, 'isAuthorized');
            authController.setUser(user);
        });
        it('Should return false if not authorized', function() {
            var isAuth = authController.isAuthorized('admin');
            // console.log(user.isAuthorized);
            user.isAuthorized.calledOnce.should.be.true;
            // this.skip if you want mocha to skip this 'it' test
            expect(isAuth).to.be.false;
        })
        it('Should return true if authorized', function() {
            authController.setRoles(['user','admin']);
            var isAuth = authController.isAuthorized('admin');
            isAuth.should.be.true;
        })
        it('should not allow get if not authorized')
        it('should allow get if authorized')
    })

    describe('isAuthorizedAsync', function() {
        it('Should return false if not authorized', function(done) {
            this.timeout(2500);
            authController.isAuthorizedAsync('admin', 
            function(isAuth) {
                assert.equal(false, isAuth);
                done();
            });
        })
    })

    describe('isAuthorizedPromise', function() {
        it('Should return false if not authorized', function() {
           return authController.isAuthorizedPromise('admin').should.eventually.be.false;
        })
    })

    describe.only('getIndex', function() {
        var user = {};
        beforeEach(function() {
            user = {
                roles: ['user'],
                isAuthorized: function(neededRole) {
                    return this.roles.indexOf(neededRole) >= 0;
                }
            }
        });
        it('should render index if authorized', function() {
            var isAuth = sinon.stub(user, 'isAuthorized').returns(true);
            // var isAuth = sinon.stub(user, 'isAuthorized').throws();
            var req = {user: user};
            var res = {
                render: function() {}
                // render: sinon.spy()
            };

            var mock = sinon.mock(res);
            mock.expects('render').once().withExactArgs('index');

            authController.getIndex(req, res);
            isAuth.calledOnce.should.be.true;
            // res.render.firstCall.args[0].should.equal('error');

            mock.verify();
        })
    })
});