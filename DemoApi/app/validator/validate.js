const { check } = require('express-validator');
var sql = require('../config/db.js');

class Validations{
    validate(method){
        switch (method) {
            case 'signup':{
                return[
                    check('firstName', 'please enter firstName').trim().notEmpty(),
                    check('firstName', 'please enter valid firstName').isAlpha(),
                    check('lastName', 'please enter lastName ').trim().notEmpty(),
                    check('lastName', 'please enter valid lastName').isAlpha(),
                    check('email', 'please enter email').trim().notEmpty(),
                    check('email', 'Please enter valid email').isEmail(),
                    check('email', 'email already Exist ').custom(emailCheck),
                    check('password', 'please enter Password ').trim().notEmpty(),
                    check('password', 'password should be minimum 6 characters').matches(/^(?=.{5,}).*$/),
                ] 
            } 
                break;
            case 'signin':{
                
                return[
                    check('email', 'please enter email').trim().notEmpty(),
                    check('email', 'Please enter valid EmailId').isEmail(),
                    check('email', 'Email doesnot Exist ').custom(CheckEmailID),
                    check('password', 'please enter password ').trim().notEmpty()
                ]
            }
                break;
            case 'token':{
                return[
                    check('token', 'Please enter token').trim().notEmpty(),
                    check('token', 'Token not valid').custom(CheckToken)
                ]
            }
                break;
            default:
                break;
        }
    }
}


function emailCheck(value,{ req }){
    if(req.params.id !== undefined && req.params.id !== null && req.params.id !== '' ){
        id =req.params.id;
    }else{
        id='';
    }
    if(value !== undefined &&value !== null && value !== '' ){
        return new Promise((resolve,reject)=>{
        const a = sql.query("select count(*) as count from customers where email =? and id !=?",[value,id],(err,res)=>{
                if(res[0].count !== 0){
                    return reject(false);
                }else{
                    return resolve(true);
                }
            })
        })
    }
    return false;
}

function CheckEmailID(value,{ req }){
    if(value !== undefined &&value !== null && value !== '' ){
        return new Promise((resolve,reject)=>{
        const a = sql.query("select count(*) as count from customers where email =? ",[value],(err,res)=>{
                if(res[0].count !== 0){
                    return resolve(true);
                }else{
                    return reject(false);
                }
            })
        })
    }
    return false;
}

function CheckToken(value,{ req }){
    if(req.params.token !== undefined && req.params.token !== null && req.params.token !== '' ){
        token =req.params.token;
    }
    if(value !== undefined &&value !== null && value !== '' ){
        return new Promise((resolve,reject)=>{
        const a = sql.query("select count(*) as count from customers where token =?",[token],(err,res)=>{
                if(res[0].count !== 0){
                    return resolve(true);
                }else{
                    return reject(false);
                }
            })
        })
    }
    return false;
}
module.exports = new Validations();