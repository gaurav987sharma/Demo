'user strict';
var sql = require('../config/db.js');
var leadsource = function(leadsource){

};

leadsource.getAllLeadSource = function (callback) {
    sql.query("select * from system_lead_source", function (err, res) {             
            if(err) {
                console.log("error: ", err);
                callback(err, null);
            }
            else{
                callback(null, res);
            }
        });   
};

leadsource.getLeadSource = function(id,callback){
    sql.query("select * from system_lead_source where id = ?", [id] ,function(err,res){
        if(err){
            console.log("error:", err);
            callback(err,null);
        }else{
            callback(null, res);
        }
    })
}


module.exports= leadsource;


