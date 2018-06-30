/**
 * User entity
 */

class User {
    constructor(id, username, password, rolename, restaurant_id) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.rolename = rolename;
        this.restaurant_id = restaurant_id;
    }
}

module.exports = User;