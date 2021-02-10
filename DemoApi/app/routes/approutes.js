'use strict';
module.exports = function(app){

    const controller = require('../controller/appController');
    const authentication = require('../auth/authentication');
    const validator = require('../validator/validate');

    /***************PersonInfo***************/
        app.route('/signup')
        .post(authentication.auth, validator.validate('signup'), controller.signup);
    
    /***************END***************/

    /***************UserInfo***************/
        app.route('/signin')
        .post(authentication.auth, validator.validate('signin'), controller.login);
        
    /***************END***************/

    /***************UserInfo***************/
        app.route('/:token')
        .get(authentication.auth, validator.validate('token'), controller.getCustomer);
    
    /***************END***************/

    /***************UserInfo***************/
    app.route('/updateCustomer/:token')
    .put(authentication.auth, validator.validate('token'), controller.updateCustomer);

    /***************END***************/
    
};

