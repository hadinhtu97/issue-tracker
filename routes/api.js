'use strict';

const LoremController = require('../controllers/loremController.js');

module.exports = (app) => {

    const loremController = new LoremController();

    app.route('/api/lorem').get((req, res) => {
        // res.send();
    })
}