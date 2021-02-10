'user strict';
const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'demo',
    debug: false,
    multipleStatements: true
});

connection.connect(function(err) {
    if (err){
        console.log('Database connection error');
        throw err;
    } 
});

module.exports = connection;
