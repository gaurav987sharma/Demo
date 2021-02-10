'use strict';
const customer=require('../model/customer');
const { validationResult } = require('express-validator');

/***************Signup***************/

    exports.signup = function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({ response_code: 400, message: errors.array().slice(0, 1).map(function (errs) { return errs.msg; }).toString() });
        }
        customer.Usersignup(req, function(err, result) {
            if (err){
                res.status(404).send(err);
            }
            else{
                res.json(result);
                res.end();
            }
        });
    };

/***************END***************/

/***************login***************/

    exports.login = function(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({ response_code: 400, message: errors.array().slice(0, 1).map(function (errs) { return errs.msg; }).toString() });
        }
        customer.userLogin(req,function(err, result){
            if(err)
                res.status(404).send(err);
            else{
                res.json(result);
            }  
        });
    }

/***************END***************/

/***************get Customer***************/

exports.getCustomer = function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({ response_code: 400, message: errors.array().slice(0, 1).map(function (errs) { return errs.msg; }).toString() });
    }
    customer.getCustomer(req,function(err, result){
        if(err)
            res.status(404).send(err);
        else{
            res.json(result);
        }  
    });
}

/***************END***************/

/***************updateCustomer***************/

exports.updateCustomer = function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({ response_code: 400, message: errors.array().slice(0, 1).map(function (errs) { return errs.msg; }).toString() });
    }
    customer.updateCustomer(req,function(err, result){
        if(err)
            res.status(404).send(err);
        else{
            res.json(result);
        }  
    });
}

/***************END***************/

