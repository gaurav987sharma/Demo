'user strict';
var sql = require('../config/db.js');
var disposition = function(disposition){
};

disposition.getAllDisposition = function (callback) {
    sql.query("select * from disposition_tab", function (err, res) {             
            if(err) {
                console.log("error: ", err);
                callback(err, null);
            }
            else{
                callback(null, res);
            }
        });   
};

disposition.getDisposition = function(id,callback){
    sql.query("select * from disposition_tab where id = ?", [id] ,function(err,res){
        if(err){
            console.log("error:", err);
            callback(err,null);
        }else{
            callback(null, res);
        }
    })
}


module.exports= disposition;


