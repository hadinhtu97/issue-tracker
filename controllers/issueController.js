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

    this.createIssue = (project, issue_title, issue_text, created_by, assigned_to = '', status_text = '') => {
        let issue = new IssueModel({
            project: project,
            issue_title: issue_title,
            issue_text: issue_text,
            created_on: new Date(),
            updated_on: new Date(),
            created_by: created_by,
            assigned_to: assigned_to,
            open: true,
            status_text: status_text
        });
        issue.save((err, data) => {
            if (err) return console.log(err);
            return data;
        })
    }

    this.getAllIssueByProject = (project) => {
        IssueModel.find({ project: project }, (err, issues) => {
            if (err) return console.log(err);
            return issues;
        })
    }

    this.updateIssue = (_id, issue_title = '', issue_text = '', created_by = '', assigned_to = '', open = '', status_text = '') => {
        IssueModel.findById(_id, (err, issue) => {
            if (err) return console.log(err);
            if (issue_title != '') issue.issue_title = issue_title;
            if (issue_text != '') issue.issue_text = issue_text;
            if (created_by != '') issue.created_by = created_by;
            if (assigned_to != '') issue.assigned_to = assigned_to;
            if (open != '') issue.open = !issue.open;
            if (status_text != '') issue.status_text = status_text;
            if (updated_on != '') issue.updated_on = new Date();
            issue.save((err, data) => {
                if (err) return console.log(err);
                return data;
            })
        })
    }

    this.deleteIssue = (_id) => {
        IssueModel.findByIdAndDelete(_id, (err, rmIssue) => {
            if (err) console.log(err);
            return rmIssue;
        })
    }

}

module.exports = IssueController;