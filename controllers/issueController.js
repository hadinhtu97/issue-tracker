'use strict';

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const issueSchema = new mongoose.Schema({
    project: String,
    issue_title: String,
    issue_text: String,
    created_on: String,
    updated_on: String,
    created_by: String,
    assigned_to: String,
    open: Boolean,
    status_text: String
})

function IssueController() {

    let IssueModel = mongoose.model('issue', issueSchema);

    this.getIssueByProject = (project, created_by, assigned_to, open, callback) => {
        IssueModel.find({
            project: project,
            created_by: created_by == undefined ? { $exists: true } : created_by,
            assigned_to: assigned_to == undefined ? { $exists: true } : assigned_to,
            open: open == undefined ? { $exists: true } : open
        }, (err, data) => err ? callback(err, null) : callback(null, data));
    }

    this.createIssue = (project, issue_title, issue_text, created_by, assigned_to, status_text, callback) => {
        let issue = new IssueModel({
            project: project,
            issue_title: issue_title,
            issue_text: issue_text,
            created_on: new Date().toUTCString(),
            updated_on: new Date().toUTCString(),
            created_by: created_by,
            assigned_to: assigned_to == undefined ? '' : assigned_to,
            open: true,
            status_text: status_text == undefined ? '' : status_text
        });
        issue.save((err, data) => err ? callback(err, null) : callback(null, data));
    }

    this.updateIssue = (_id, issue_title, issue_text, created_by, assigned_to, open, status_text, callback) => {
        IssueModel.findById(_id, (err, issue) => {
            if (err) {
                callback(err, null);
            } else if (issue == null) {
                callback(true, null);
            } else {
                if (issue_title != undefined) issue.issue_title = issue_title;
                if (issue_text != undefined) issue.issue_text = issue_text;
                if (created_by != undefined) issue.created_by = created_by;
                if (assigned_to != undefined) issue.assigned_to = assigned_to;
                if (open != undefined) issue.open = !issue.open;
                if (status_text != undefined) issue.status_text = status_text;
                issue.updated_on = new Date().toUTCString();
                issue.save((err, data) => err ? callback(err, null) : callback(null, data));
            }
        })
    }

    this.deleteIssue = (_id, callback) => {
        IssueModel.findByIdAndDelete(_id, (err, data) => err ? callback(err, null) : data == null ? callback(true, null) : callback(null, data));
    }
}

module.exports = IssueController;