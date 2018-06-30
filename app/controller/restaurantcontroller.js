/* Load restaurant Data Access Object */
const RestaurantDao = require('../dao/restaurantdao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllercommon');

/* Load restaurant entity */
const Restaurant = require('../model/restaurant');

/**
 * restaurant Controller
 */
class RestaurantController {

    constructor() {
        this.restaurantdao = new RestaurantDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.restaurantdao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.restaurantdao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.RestaurantDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let restaurant = new Restaurant();
        restaurant.id = req.body.id;
        restaurant.name = req.body.name;
        restaurant.description = req.body.description;

        return this.restaurantdao.update(restaurant)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let restaurant = new Restaurant();
        if (req.body.id) {
            restaurant.id = req.body.id;
        }
        restaurant.name = req.body.name;
        restaurant.description = req.body.description;

        if (req.body.id) {
            return this.restaurantdao.createWithId(restaurant)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        } else {
            return this.restaurantdao.create(restaurant)
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

        this.restaurantdao.deleteById(id)
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

        this.restaurantdao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = RestaurantController;