/* Load user entity */
const User = require('../model/user');

/* Load DAO Common functions */
const DaoCommon = require('./commons/daocommon');

/**
 * user Data Access Object
 */
class UserDao {

    constructor() {
        this.common = new DaoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT id, username, password, rolename, restaurant_id FROM users WHERE id=$id";
        let sqlParams = {
            $id: id
        };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new User(row.id, row.username, row.password, row.rolename, row.restaurant_id));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM users";
        return this.common.findAll(sqlRequest).then(rows => {
            let users = [];

            for (const row of rows) {
                users.push(new User(row.id, row.username, row.password, row.rolename, row.restaurant_id));
            }
            return users;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM users";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params user
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(user) {
        let sqlRequest = "UPDATE users SET " +
            "username=$username, " +
            "password=$password, " +
            "rolename=$rolename, " +
            "restaurant_id=$restaurant_id " +
            "WHERE id=$id";

        let sqlParams = {
            $username: user.username,
            $password: user.password,
            $rolename: user.rolename,
            $restaurant_id: user.restaurant_id,
            $id: user.id
        };
        return this.common.run(sqlRequest, sqlParams).then(row => {
            return this.findById(user.id);
        });
    };

    /**
     * Creates the given entity in the database
     * @params user
     * returns database insertion status
     */
    create(user) {
        let sqlRequest = "INSERT into users (username, password, rolename, restaurant_id) " +
            "VALUES ($username, $password, $rolename, $restaurant_id)";
        let sqlParams = {
            $username: user.username,
            $password: user.password,
            $rolename: user.rolename,
            $restaurant_id: user.restaurant_id
        };
        return this.common.insert(sqlRequest, sqlParams).then(lastid => {
            return this.findById(lastid);
        });
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params user
     * returns database insertion status
     */
    createWithId(user) {
        let sqlRequest = "INSERT into users (id, username, password, rolename, restaurant_id) " +
            "VALUES ($id, $username, $password, $rolename, $restaurant_id)";
        let sqlParams = {
            $id: user.id,
            $username: user.username,
            $password: user.password,
            $rolename: user.rolename,
            $restaurant_id: user.restaurant_id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM users WHERE id=$id";
        let sqlParams = {
            $id: id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM users WHERE id=$id";
        let sqlParams = {
            $id: id
        };
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = UserDao;