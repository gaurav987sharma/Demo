'user strict';
var sql = require('../config/db.js');
var ticketstatus = function(ticketstatus){

};

ticketstatus.getAllTicketStatus = function (callback) {
    sql.query("select * from ticket_status", function (err, res) {             
            if(err) {
                console.log("error: ", err);
                callback(err, null);
            }
            else{
                callback(null, res);
            }
        });   
};

ticketstatus.getTicketStatus = function(id,callback){
    sql.query("select * from ticket_status where id = ?", [id] ,function(err,res){
        if(err){
            console.log("error:", err);
            callback(err,null);
        }else{
            callback(null, res);
        }
    })
}


module.exports= ticketstatus;


