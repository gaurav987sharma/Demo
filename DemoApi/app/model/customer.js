
'user strict';
var sql = require('../config/db.js');
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');
var customer = function(customer){

};

customer.Usersignup = async function(req,callback) {
    let password = md5(req.body.password);
    let post  = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: password
    };

    let a =sql.query("insert into customers set ?", post,function (err, res) {         
            if(err) {
                callback(err, null);
            }
            else{
                callback(null, {data:{message: 'Signup successfully.',result: {InsertId: res.insertId}}});
            }
    });
                
}; 

customer.userLogin = async function(req,callback) {
    let email = req.body.email;
    let password = md5(req.body.password);
    sqlquery =  sql.query("select id from customers where email =? and password=?",[email,password],function (err, res) {         
        if(err){
            callback(err, null);
        }else{
            if(res.length !== 0 && res[0].id !== undefined){
                let id = res[0].id;
                let token = uuidv4();
                sqlquery =  sql.query("update customers set token =? where id=?",[token,id],function (err, res) {
                    if(err) {
                        callback(err, null);
                    }
                    else{
                        let data={
                            id:id,
                            token:token
                        }
                        callback(null, {data:{message: 'Signin successfully.',result:data}});
                    }
                });
            }else{
                let data={};
                callback({data:{message: 'Please Correct Password.',result:data}}, null);
            }
        }
});
}

customer.getCustomer = async function(req,callback) {
    let token = req.params.token;
    sqlquery =  sql.query("select id,firstName,lastName,email from customers where token =?",[token],function (err, res) {   
        if(err){
            callback(err, null);
        }else{
            callback(null, {data:{message: 'Record successfully fetched',result:res[0]}});  
        }
    });
}

customer.updateCustomer = async function(req,callback) {
    let token = req.params.token;
    var sqlQ = `UPDATE customers SET firstName = '${req.body.firstName}', lastName = '${req.body.lastName}', email = '${req.body.email}' WHERE token=?`;

    sqlquery =  sql.query(sqlQ,[token],function (err, res) {
        if(err){
            callback(err, null);
        }else{
            callback(null, {data:{message: 'Record successfully Update',result:res[0]}});  
        }
    });
}



module.exports= customer;


