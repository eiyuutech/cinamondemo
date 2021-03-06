/* Load modules */
const express = require("express");

const app = express();

const bodyParser = require("body-parser");

/* Database configuration */
const database = require('./app/config/sqlite');

/* Init database */
database.init();

/* Init server listening */
const port = process.argv[2] || 3000;
app.listen(port, function() {
    console.log("Server listening on port : " + port);
});

/* Express configuration */
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/* Router configuration */
const REST_API_ROOT = '/api';
app.use(REST_API_ROOT, require('./app/routes/route'));

app.use(express.static('public'))

app.set('view engine', 'ejs');

// cinamon page 
app.get('/cinamon', function(req, res) {
    res.render('pages/cinamon');
});
// operator page 
app.get('/operator', function(req, res) {
    res.render('pages/operator');
});