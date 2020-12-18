'use strict';

const IssueController = require('../controllers/issueController.js');

module.exports = (app) => {

    let issueController = new IssueController();

    app.route('/api/issue/:project/')
        .get((req, res) => {
            
        })
        .post((req, res) => {

        })
        .put((req, res) => {

        })
        .delete((req, res) => {

        })
}