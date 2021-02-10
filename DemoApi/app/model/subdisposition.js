'user strict';
var sql = require('../config/db.js');
var subdisposition = function(subdisposition){

};

subdisposition.getAllSubDisposition = function (callback) {
    sql.query("select * from sub_disposition_tab", function (err, res) {             
            if(err) {
                console.log("error: ", err);
                callback(err, null);
            }
            else{
                callback(null, res);
            }
        });   
};

subdisposition.getSubDisposition = function(id,callback){
    sql.query("select * from sub_disposition_tab where id = ?", [id] ,function(err,res){
        if(err){
            console.log("error:", err);
            callback(err,null);
        }else{
            callback(null, res);
        }
    })
}


module.exports= subdisposition;


