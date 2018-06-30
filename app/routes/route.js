/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/user', require('./api/userroutes'));
router.use('/restaurant', require('./api/restaurantroutes'));

module.exports = router;