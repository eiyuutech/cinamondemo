/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./database/cinamon.eiyuu');

/* Init car and driver tables if they don't exist */
let init = function() {
    db.run("CREATE TABLE if not exists restaurants (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " name TEXT," +
        " description TEXT" +
        ")");

    db.run("CREATE TABLE if not exists users (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " username TEXT," +
        " password TEXT," +
        " rolename TEXT," +
        " restaurant_id INT" +
        ")");
};

module.exports = {
    init: init,
    db: db
};