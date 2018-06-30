/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const RestaurantController = require('../../controller/restaurantcontroller');
const controller = new RestaurantController();

/**
 * restaurant Entity routes
 */
router.get('/count', function(req, res) {
    controller.countAll(res);
});

router.get('/exists/:id', function(req, res) {
    controller.exists(req, res);
});

router.get('/:id', function(req, res) {
    controller.findById(req, res);
});

router.get('/', function(req, res) {
    controller.findAll(res);
});

router.put('/:id', function(req, res) {
    controller.update(req, res);
});

router.post('/create', function(req, res) {
    controller.create(req, res);
});

router.delete('/:id', function(req, res) {
    controller.deleteById(req, res);
});

module.exports = router;