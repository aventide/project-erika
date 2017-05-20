/**
 * Created by alex on 5/19/17.
 */

let mysql = require('mysql');
let pool  = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "woi9HooZ",
    database: "kemmcare"
});

// callback is essentially (error code, rows returned)
exports.getUsers = function(query, callback){
    pool.getConnection( (err, connection) => {
        if(err) {
            console.log(err);
            callback(true);
            return;
        }
        connection.query(query, [], (err, results) => {
            connection.release();
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
};