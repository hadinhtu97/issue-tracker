'use strict';

const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
require("dotenv").config();

const apiRoutes = require('./routes/api.js');

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

app.route('/').get((req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Routes below here


apiRoutes(app);


// Routes above here 

// Not found page
app.use((req, res) => {
    res.status(404);
    res.send('Not Found');
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + process.env.PORT);
})