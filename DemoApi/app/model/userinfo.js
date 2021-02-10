
'user strict';
var sql = require('../config/db.js');
var userinfo = function(userinfo){

};

userinfo.getAllUserInfo =async function (req,callback) {
    let query_str ="select * from users";
    if((req.query.phone_mobile !== undefined && req.query.phone_mobile !== null && req.query.phone_mobile !== '')  || (req.query.email1 !== undefined && req.query.email1 !== null && req.query.email1 !== '') || (req.query.user_name !== undefined && req.query.user_name !== null && req.query.user_name !== '')){

        var obj = {phone_mobile: req.query.phone_mobile, email1: req.query.email1, user_name: req.query.user_name};

        let final_obj = await clean(obj);
        let count = 1;
        let str = '';
        let length = Object.keys(final_obj).length;

        for(a in final_obj){
            if(count == length){
                str += a +' = '+ "'"+obj[a]+"'";
            }else{
                str += a +' = '+"'"+obj[a]+"'" +' or ';
            }
            count++;
        }
        query_str = "select * from users where "+str;
    }
    sql.query(query_str, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                callback(err, null);
            }
            else{
                callback(null, res);
            }
        });   
};

userinfo.addUserInfo = async function(req,callback) {
    if((req.body.phone_mobile !== null && req.body.phone_mobile !== '') || (req.body.email1 !== null && req.body.email1 !== '') ){
        var obj = {phone_mobile: req.body.phone_mobile, email1: req.body.email1};
        let final_obj = await clean(obj);
        let count = 1;
        let str = '';
        let length = Object.keys(final_obj).length;
        for(a in final_obj){
            if(count == length){
                str += a +' = '+ "'"+obj[a]+"'";
            }else{
                str += a +' = '+ "'"+obj[a]+"'" +' or ';
            }
            count++;
        }
        let query = "select count(user_id) as total from users where "+str;
        sql.query(query,function (err, res) {             
            if(err) {
                console.log("error: ", err);
                callback(err, null);
            }
            else{
                if(res[0].total >= 1 ){
                    callback(null, {data:{message: 'User mail or mobile no  is already exist.',result: {}}});
                }else{
                    var post  = {user_name: req.body.user_name,user_password: req.body.user_password, dept_id: req.body.dept_id, phone_home: req.body.phone_home, phone_mobile: req.body.phone_mobile, phone_work: req.body.phone_work, phone_fax: req.body.phone_fax, email1: req.body.email1, email2: req.body.email2, first_name: req.body.first_name, middle_name: req.body.middle_name, last_name: req.body.last_name, address1: req.body.address1,address2: req.body.address2, city: req.body.city, state: req.body.state, country: req.body.country, postalcode: req.body.postalcode, employeeCode: req.body.employeeCode, expire_user: req.body.expire_user, organization: req.body.organization, telephony_agent_id: req.body.telephony_agent_id, last_logged_in: req.body.last_logged_in, dob: req.body.dob, dateOfJoin: req.body.dateOfJoin, resign_date: req.body.resign_date, designation: req.body.designation, source_app: req.body.source_app, assign_type: req.body.assign_type, modified_on_unix: req.body.modified_on_unix, modified_by: req.body.modified_by,role_id: req.body.role_id,modified_by: req.body.modified_by};
        
                    sql.query("insert into users set ?", post,function (err, res) {             
                            if(err) {
                                console.log("error: ", err);
                                callback(err, null);
                            }
                            else{
                                callback(null, {data:{message: 'User added successfully.',result: {InsertId: res.insertId}}});
                            }
                    });
                }
            }
        });
         
    }else{
        callback(null, {data:{message: 'Please Enter Min One field (Mobile no, email id).',error:""}});
    }
     
};

userinfo.editUserInfo = async function(req,callback) {
    var id = req.params.id;
    var obj = {phone_mobile: req.body.phone_mobile, email1: req.body.email1};               
    let final_obj = await clean(obj);
    sql.query("select count(user_id) as total from users where user_id = ?", [id] ,function(err,res){
        if(err){
            console.log("error:", err);
            callback(err,null);
        }else{
            if(res[0].total < 1 ){
                callback(null, {data:{message: 'User does not exist.',result: {}}});
            }else{
                if((req.body.phone_mobile !== null && req.body.phone_mobile !== '') || (req.body.email1 !== null && req.body.email1 !== '')){
                    
                    let count = 1;
                    let str = '';
                    let length = Object.keys(final_obj).length;
                    for(a in final_obj){
                        if(count == length){
                            str += a +' = '+"'"+obj[a]+"'";
                        }else{
                            str += a +' = '+"'"+obj[a]+"'" +' or ';
                        }
                        count++;
                    }
                    let query = "select count(user_id) as total from users where ("+str 
                    +") and user_id !=" +id ;
                    sqlquery =  sql.query(query,function (err, res) {             
                        if(err) {
                            console.log("error: ", err);
                            callback(err, null);
                        }
                        else{
                            if(res[0].total >= 1 ){
                                callback(null, {data:{message: 'User mail or mobile no is already exist.',result: {}}});
                            }else{
                                var post  = {user_name: req.body.user_name, dept_name: req.body.dept_name, phone_home: req.body.phone_home, phone_mobile: req.body.phone_mobile, phone_work: req.body.phone_work, phone_fax: req.body.phone_fax, email1: req.body.email1, email2: req.body.email2, first_name: req.body.first_name, middle_name: req.body.middle_name, last_name: req.body.last_name, address1: req.body.address1,address2: req.body.address2, city: req.body.city, state: req.body.state, country: req.body.country, postalcode: req.body.postalcode, employeeCode: req.body.employeeCode, expire_user: req.body.expire_user, organization: req.body.organization, telephony_agent_id: req.body.telephony_agent_id, last_logged_in: req.body.last_logged_in, dob: req.body.dob, dateOfJoin: req.body.dateOfJoin, resign_date: req.body.resign_date, designation: req.body.designation, source_app: req.body.source_app, assign_type: req.body.assign_type, modified_on_unix: req.body.modified_on_unix, modified_by: req.body.modified_by, social_fb_id: req.body.social_fb_id, social_tweet_id: req.body.social_tweet_id};
                                let update_obj = clean(post);
            
                                let sqll = sql.query("update users set ? where user_id =?", [update_obj, id],function (err, res) {             
                                        if(err) {
                                            console.log("error: ", err);
                                            callback(err, null);
                                        }
                                        else{
                                            callback(null, {data:{message: 'User updated successfully.',result: {UpdateId: req.params.id}}});
                                        }
                                });
                            }
                        }
                    });
                     
                }else{
                    callback(null, {data:{message: 'Please Enter Min One field (Mobile no, email id).',error:""}});
                }
            }
        }
    })

    
     
};


function clean(obj,opt) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
        delete obj[propName];
      }
    }
    return obj;
}
userinfo.getUserInfo = function(id,callback){
    sql.query("select * from users where user_id = ?", [id] ,function(err,res){
        if(err){
            console.log("error:", err);
            callback(err,null);
        }else{
            callback(null, res);
        }
    })
}


module.exports= userinfo;


