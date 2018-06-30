/* Load user Data Access Object */
const UserDao = require('../dao/userdao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllercommon');

/* Load user entity */
const User = require('../model/user');

/**
 * user Controller
 */
class UserController {

    constructor() {
        this.userdao = new UserDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.userdao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.userdao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.userdao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let user = new User();
        user.id = req.body.id;
        user.username = req.body.username;
        user.password = req.body.password;
        user.rolename = req.body.rolename;
        user.restaurant_id = req.body.restaurant_id;

        return this.userdao.update(user)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let user = new User();
        if (req.body.id) {
            user.id = req.body.id;
        }
        user.username = req.body.username;
        user.password = req.body.password;
        user.rolename = req.body.rolename;
        user.restaurant_id = req.body.restaurant_id;

        if (req.body.id) {
            return this.userdao.createWithId(user)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        } else {
            return this.userdao.create(user)
                .then(this.common.insertSuccess(res))
                .catch(this.common.serverError(res));
        }

    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteById(req, res) {
        let id = req.params.id;

        this.userdao.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let id = req.params.id;

        this.userdao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = UserController;