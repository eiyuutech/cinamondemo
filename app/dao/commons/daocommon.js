/* Load database & database configuration */
const database = require('../../config/sqlite');

/* Load bluebird Promise */
const Promise = require('bluebird');

/* Load DAO Error entity */
const daoerror = require('./daoerror');

/**
 * DAOs Common functions
 */
class Common {

    findAll(sqlRequest) {
        return new Promise(function(resolve, reject) {
            database.db.all(sqlRequest, function(err, rows) {
                if (err) {
                    reject(
                        new daoerror(20, "Internal server error")
                    );
                } else if (rows === null || rows.length === 0) {
                    reject(
                        new daoerror(21, "Entity not found")
                    );
                } else {
                    resolve(rows);
                }
            })
        });
    }

    findOne(sqlRequest, sqlParams) {
        return new Promise(function(resolve, reject) {
            let stmt = database.db.prepare(sqlRequest);
            stmt.all(sqlParams, function(err, rows) {
                if (err) {
                    reject(
                        new daoerror(11, "Invalid arguments")
                    );
                } else if (rows === null || rows.length === 0) {
                    reject(
                        new daoerror(21, "Entity not found")
                    );
                } else {
                    let row = rows[0];
                    resolve(row);
                }
            })
        });
    }

    existsOne(sqlRequest, sqlParams) {
        return new Promise(function(resolve, reject) {
            let stmt = database.db.prepare(sqlRequest);
            stmt.each(sqlParams, function(err, row) {
                if (err) {
                    reject(
                        new daoerror(20, "Internal server error")
                    );
                } else if (row && row.found === 1) {
                    resolve(true);
                } else {
                    reject(
                        new daoerror(21, "Entity not found")
                    );
                }
            })
        });
    }

    run(sqlRequest, sqlParams) {
        return new Promise(function(resolve, reject) {
            let stmt = database.db.prepare(sqlRequest);
            stmt.run(sqlParams, function(err) {
                if (this.changes === 1) {
                    resolve(true);
                } else if (this.changes === 0) {
                    reject(
                        new daoerror(21, "Entity not found")
                    )
                } else {
                    console.log(err);
                    reject(
                        new daoerror(11, "Invalid arguments")
                    )
                }
            })
        });
    }
    insert(sqlRequest, sqlParams) {
        return new Promise(function(resolve, reject) {
            let stmt = database.db.prepare(sqlRequest);
            stmt.run(sqlParams, function(err) {
                if (this.changes === 1) {
                    resolve(stmt.lastID);
                } else if (this.changes === 0) {
                    reject(
                        new daoerror(21, "Entity not found")
                    )
                } else {
                    console.log(err);
                    reject(
                        new daoerror(11, "Invalid arguments")
                    )
                }
            })
        });
    }
}

module.exports = Common;