/* Load restaurant entity */
const Restaurant = require('../model/restaurant');

/* Load DAO Common functions */
const DaoCommon = require('./commons/daocommon');

/**
 * restaurant Data Access Object
 */
class RestaurantDao {

    constructor() {
        this.common = new DaoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT id, name, description FROM restaurants WHERE id=$id";
        let sqlParams = {
            $id: id
        };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Restaurant(row.id, row.name, row.description));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM restaurants";
        return this.common.findAll(sqlRequest).then(rows => {
            let restaurants = [];
            for (const row of rows) {
                restaurants.push(new Restaurant(row.id, row.name, row.description));
            }
            return restaurants;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM restaurants";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params restaurant
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(restaurant) {
        let sqlRequest = "UPDATE restaurants SET " +
            "name=$name, " +
            "description=$description " +
            "WHERE id=$id";

        let sqlParams = {
            $name: restaurant.name,
            $description: restaurant.description,
            $id: restaurant.id
        };
        return this.common.run(sqlRequest, sqlParams).then(row => {
            return this.findById(restaurant.id);
        });
    };

    /**
     * Creates the given entity in the database
     * @params restaurant
     * returns database insertion status
     */
    create(restaurant) {
        let sqlRequest = "INSERT into restaurants (name, description) " +
            "VALUES ($name, $description)";
        let sqlParams = {
            $name: restaurant.name,
            $description: restaurant.description
        };
        return this.common.insert(sqlRequest, sqlParams).then(lastid => {
            return this.findById(lastid);
        });
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params restaurant
     * returns database insertion status
     */
    createWithId(restaurant) {
        let sqlRequest = "INSERT into restaurants (id, name, description) " +
            "VALUES ($id, $name, $description)";
        let sqlParams = {
            $id: restaurant.id,
            $name: restaurant.name,
            $description: restaurant.description
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM restaurants WHERE id=$id";
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
        let sqlRequest = "SELECT (count(*) > 0) as found FROM restaurants WHERE id=$id";
        let sqlParams = {
            $id: id
        };
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = RestaurantDao;