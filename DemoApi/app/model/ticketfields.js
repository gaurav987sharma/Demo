'user strict';
var sql = require('../config/db.js');
var request = require('request');
var ticketfields = function(ticketfields){

};
ticketfields.getTicketField = function (callback) {
    sql.query("DESC ticket_details_report", function (err, res) {             
            if(err) {
                console.log("error: ", err);
                callback(err, null);
            }
            else{
                callback(null, res);
            }
        });   
};

function clean(obj,opt) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
        delete obj[propName];
      }
    }
    return obj;
}

module.exports= ticketfields;


