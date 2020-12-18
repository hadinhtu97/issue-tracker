'use strict';

const IssueController = require('../controllers/issueController.js');

module.exports = (app) => {

    let issueController = new IssueController();

    app.route('/api/issues/:project/')
        .get((req, res) => {
            issueController.getIssueByProject(req.params.project, req.query.created_by, req.query.assigned_to, req.query.open, (err, issues) => {
                err ? res.json(err) : res.json(issues);
            });
        })
        .post((req, res) => {
            if (req.body.created_by == undefined || req.body.issue_title == undefined || req.body.issue_text == undefined) {
                res.json({ error: 'required field(s) missing' })
            } else {
                issueController.createIssue(req.params.project, req.body.issue_title, req.body.issue_text, req.body.created_by, req.body.assigned_to, req.body.status_text, (err, issue) => {
                    err ? res.json(err) : res.json(issue);
                })
            }
        })
        .put((req, res) => {
            if (req.body._id == undefined) {
                res.json({ error: 'missing _id' })
            } else if (req.body.issue_title == undefined && req.body.issue_text == undefined && req.body.created_by == undefined && req.body.assigned_to == undefined && req.body.open == undefined && req.body.status_text == undefined) {
                res.json({ error: 'no update field(s) sent', '_id': req.body._id })
            } else {
                issueController.updateIssue(req.body._id, req.body.issue_title, req.body.issue_text, req.body.created_by, req.body.assigned_to, req.body.open, req.body.status_text, (err, issueUpdated) => {
                    err ? res.json({ error: 'could not update', '_id': req.body._id }) : res.json({ result: 'successfully updated', '_id': req.body._id })
                })
            }
        })
        .delete((req, res) => {
            if (req.body._id == undefined) {
                res.json({ error: 'missing _id' });
            } else {
                issueController.deleteIssue(req.body._id, (err, issueDeleted) => {
                    err ? res.json({ error: 'could not delete', '_id': req.body._id }) : res.json({ result: 'successfully deleted', '_id': req.body._id });
                })
            }
        })
}