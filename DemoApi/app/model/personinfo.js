
'user strict';
var sql = require('../config/db.js');
const { ObjectID } = require('mongodb');
var personinfo = function(personinfo){

};

personinfo.getAllPersonInfo = async function (req,callback) {
    let query_str ="select * from person_info";
    if((req.query.mobile_no !== undefined && req.query.mobile_no !== null && req.query.mobile_no !== '')  || (req.query.person_mail !== undefined && req.query.person_mail !== null && req.query.person_mail !== '')){

        var obj = {mobile_no: req.query.mobile_no, person_mail: req.query.person_mail};

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
        query_str = "select * from person_info where "+str;
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

personinfo.addPersonInfo = async function(req,callback) {
    if((req.body.mobile_no !== null && req.body.mobile_no !== '') || (req.body.person_mail !== null && req.body.person_mail !== '') || (req.body.social_fb_id !== null && req.body.social_fb_id !== '') || (req.body.social_tweet_id !== null && req.body.social_tweet_id !== '')){
        var obj = {mobile_no: req.body.mobile_no, person_mail: req.body.person_mail, social_fb_id: req.body.social_fb_id, social_tweet_id: req.body.social_tweet_id};
        let final_obj = await clean(obj);
        let count = 1;
        let str = ' and ';
        let length = Object.keys(final_obj).length;
        for(a in final_obj){
            if(count == length){
                str += a +' = '+ "'"+obj[a]+"'";
            }else{
                str += a +' = '+"'"+obj[a]+"'" +' or ';
            }
            count++;
        }
		console.log(str);
		if(/(and)/.test(str)){
			str = str.slice(0,-3);
		}
		console.log(str);
        let query = "select count(person_id) as total from person_info where 1"+str;
        sql.query(query,function (err, res) {             
            if(err) {
                console.log("error: ", err);
                callback(err, null);
            }
            else{
				//console.log(str.length+"***********"+(str!=' ' && res[0].total >= 1 ));
                if(str!=' ' && res[0].total >= 1 ){
                    callback(err, {data:{message: 'Person mail or mobile no or fb id or tweet id is already exist.',result: {}}});
                }else{
                    
                    const newObjectId = new ObjectID();
                    var post  = {person_name: req.body.person_name, designation: req.body.designation, phone1: req.body.phone1, phone2: req.body.phone2, phone3: req.body.phone3, mobile_no: req.body.mobile_no, person_mail: req.body.person_mail, user_name_create: req.body.user_name_create, first_name: req.body.first_name, middle_name: req.body.middle_name, last_name: req.body.last_name, fathers_name: req.body.fathers_name, country_name: req.body.country_name, state_name: req.body.state_name, city_name: req.body.city_name, dob: req.body.dob, additional_info: req.body.additional_info, address: req.body.address, modified_on_unix: req.body.modified_on_unix, modified_by: req.body.modified_by, social_fb_id: req.body.social_fb_id, social_tweet_id: req.body.social_tweet_id};
        
                    sql.query("insert into person_info set ?", post,function (err, res) {             
                            if(err) {
                                callback(err, null);
                            }
                            else{
                                callback(null, {data:{message: 'Person added successfully.',result: {InsertId: res.insertId}}});
                            }
                    });
                }
            }
        });
         
    }else{
        callback(null, {data:{message: 'Please Enter Min One field (Mobile no, email id, fb id, tweet id).',error:""}});
    }
     
};

personinfo.editPersonInfo = async function(req,callback) {
    var id = req.params.id;
    var obj = {mobile_no: req.body.mobile_no, person_mail: req.body.person_mail, social_fb_id: req.body.social_fb_id, social_tweet_id: req.body.social_tweet_id};               
    let final_obj = await clean(obj);
    sql.query("select count(person_id) as total from person_info where person_id = ?", [id] ,function(err,res){
        if(err){
            console.log("error:", err);
            callback(err,null);
        }else{
            if(res[0].total < 1 ){
                callback(null, {data:{message: 'Person does not exist.',result: {}}});
            }else{
                if((req.body.mobile_no !== null && req.body.mobile_no !== '') || (req.body.person_mail !== null && req.body.person_mail !== '') || (req.body.social_fb_id !== null && req.body.social_fb_id !== '') || (req.body.social_tweet_id !== null && req.body.social_tweet_id !== '')){
                    
                    let count = 1;
                    let str = '';
                    let length = Object.keys(final_obj).length;
                    for(a in final_obj){
                        if(count == length){
                            str += a +' = '+ obj[a];
                        }else{
                            str += a +' = '+ obj[a] +' or ';
                        }
                        count++;
                    }
                    let query = "select count(person_id) as total from person_info where ("+str 
                    +") and person_id !=" +id ;
                    sqlquery =  sql.query(query,function (err, res) {             
                        if(err) {
                            console.log("error: ", err);
                            callback(err, null);
                        }
                        else{
                            if(res[0].total >= 1 ){
                                callback(null, {data:{message: 'Person mail or mobile no or fb id or tweet id is already exist.',result: {}}});
                            }else{
                                var post  = {person_name: req.body.person_name, designation: req.body.designation, phone1: req.body.phone1, phone2: req.body.phone2, phone3: req.body.phone3, mobile_no: req.body.mobile_no, person_mail: req.body.person_mail, user_name_create: req.body.user_name_create, first_name: req.body.first_name, middle_name: req.body.middle_name, last_name: req.body.last_name, fathers_name: req.body.fathers_name, country_name: req.body.country_name, state_name: req.body.state_name, city_name: req.body.city_name, dob: req.body.dob, additional_info: req.body.additional_info, address: req.body.address, modified_on_unix: req.body.modified_on_unix, modified_by: req.body.modified_by, social_fb_id: req.body.social_fb_id, social_tweet_id: req.body.social_tweet_id};
                                let update_obj = clean(post);
            
                                let sqll = sql.query("update person_info set ? where person_id =?", [update_obj, id],function (err, res) {             
                                        if(err) {
                                            console.log("error: ", err);
                                            callback(err, null);
                                        }
                                        else{
                                            callback(null, {data:{message: 'Person updated successfully.',result: {UpdateId: req.params.id}}});
                                        }
                                });
                            }
                        }
                    });
                     
                }else{
                    callback(null, {data:{message: 'Please Enter Min One field (Mobile no, email id, fb id, tweet id).',error:""}});
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
personinfo.getPersonInfo = function(id,callback){
    sql.query("select * from person_info where person_id = ?", [id] ,function(err,res){
        if(err){
            console.log("error:", err);
            callback(err,null);
        }else{
            callback(null, res);
        }
    })
}


module.exports= personinfo;


