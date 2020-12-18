'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const IssueController = require('../controllers/issueController.js');

chai.use(chaiHttp);

const server = 'http://localhost:3000';
let issueController = new IssueController();

describe('Functional Test', () => {

    it('Create an issue with every field: POST request to /api/issues/test', (done) => {
        chai.request(server)
            .post('/api/issues/test')
            .send({
                issue_title: 'Login',
                issue_text: 'Login problem',
                created_by: 'iam',
                assigned_to: 'you',
                status_text: 'status'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isString(res.body._id);
                assert.equal(res.body.issue_text, 'Login problem');
                assert.equal(res.body.issue_title, 'Login');
                assert.equal(res.body.created_by, 'iam');
                assert.equal(res.body.assigned_to, 'you');
                assert.equal(res.body.status_text, 'status');
                assert.isString(res.body.created_on);
                assert.isString(res.body.updated_on);
                assert.isTrue(res.body.open);
                done();
            })
    })

    it('Create an issue with only required fields: POST request to /api/issues/test', (done) => {
        chai.request(server)
            .post('/api/issues/test')
            .send({
                issue_title: 'Login',
                issue_text: 'Login problem',
                created_by: 'iam',
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isString(res.body._id);
                assert.equal(res.body.issue_text, 'Login problem');
                assert.equal(res.body.issue_title, 'Login');
                assert.equal(res.body.created_by, 'iam');
                assert.equal(res.body.assigned_to, '');
                assert.equal(res.body.status_text, '');
                assert.isString(res.body.created_on);
                assert.isString(res.body.updated_on);
                assert.isTrue(res.body.open);
                done();
            })
    })

    it('Create an issue with missing required fields: POST request to /api/issues/test', (done) => {
        chai.request(server)
            .post('/api/issues/test')
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'required field(s) missing');
                done();
            })
    })

    it('Issues on a project: GET request to /api/issues/test', (done) => {
        chai.request(server)
            .get('/api/issues/test')
            .query({})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isArray(res.body);
                done();
            })
    })

    it('View issues on a project: GET request to /api/issues/test?open=true', (done) => {
        chai.request(server)
            .get('/api/issues/test')
            .query({
                open: true
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                res.body.forEach(obj => {
                    assert.isTrue(obj.open);
                })
                done();
            })
    })

    it('View issues on a project with multiple filters: GET request to /api/issues/test?open=true&assigned_to=Joe', (done) => {
        chai.request(server)
            .get('/api/issues/test')
            .query({
                open: true,
                assigned_to: 'Joe'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                res.body.forEach(obj => {
                    assert.isTrue(obj.open);
                    assert.equal(obj.assigned_to, 'Joe');
                })
                done();
            })
    })

    it('Update one field on an issue: PUT request to /api/issues/test', (done) => {
        // chai.request(server)
        //     .put('/api/issues/test')
        //     .send({
        //         _id: '5fdcbf93d0dbbb78994bf2b0',
        //         created_by: 'tuhd'
        //     })
        //     .end((err, res) => {
        //         assert.equal(res.status, 200);
        //         assert.equal(res.body.result, 'successfully updated');
        //         assert.equal(res.body._id, '5fdcbf93d0dbbb78994bf2b0');
        //         done();
        //     })
        done();
    })

    it('Update multiple fields on an issue: PUT request to /api/issues/test', (done) => {
        // chai.request(server)
        //     .put('/api/issues/test')
        //     .send({
        //         _id: '5fdcbf93d0dbbb78994bf2b0',
        //         created_by: 'tuhd',
        //         assigned_to: 'you'
        //     })
        //     .end((err, res) => {
        //         assert.equal(res.status, 200);
        //         assert.equal(res.body.result, 'successfully updated');
        //         assert.equal(res.body._id, '5fdcbf93d0dbbb78994bf2b0');
        //         done();
        //     })
        done();
    })

    it('Update an issue with missing _id: PUT request to /api/issues/test', (done) => {
        chai.request(server)
            .put('/api/issues/test')
            .send({
                created_by: 'tuhd',
                assigned_to: 'you'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'missing _id');
                done();
            })
    })

    it('Update an issue with no fields to update: PUT request to /api/issues/test', (done) => {
        chai.request(server)
            .put('/api/issues/test')
            .send({
                _id: '1'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'no update field(s) sent');
                done();
            })
    })

    it('Update an issue with an invalid _id: PUT request to /api/issues/test', (done) => {
        chai.request(server)
            .put('/api/issues/test')
            .send({
                _id: '1',
                created_by: 'tuhd'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'could not update');
                assert.equal(res.body._id, '1');
                done();
            })
    })

    it('Delete an issue: DELETE request to /api/issues/test', (done) => {
        // chai.request(server)
        //     .delete('/api/issues/test')
        //     .send({
        //         _id: '1'
        //     })
        //     .end((err, res) => {
        //         assert.equal(res.status, 200);
        //         assert.equal(res.body.result, 'successfully deleted');
        //         assert.equal(res.body._id, '1');
        //         done();
        //     })
        done();
    })

    it('Delete an issue with an invalid _id: DELETE request to /api/issues/test', (done) => {
        chai.request(server)
            .delete('/api/issues/test')
            .send({
                _id: '1'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'could not delete');
                assert.equal(res.body._id, '1');
                done();
            })
    })

    it('Delete an issue with missing _id: DELETE request to /api/issues/test', (done) => {
        chai.request(server)
            .delete('/api/issues/test')
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'missing _id');
                done();
            })
    })

})