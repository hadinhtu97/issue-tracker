'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;

chai.use(chaiHttp);

const server = 'http://localhost:3000';

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
        chai.request(server)
            .post('/api/issues/test')
            .send({
                issue_title: 'Login',
                issue_text: 'Login problem',
                created_by: 'iam',
            })
            .then(data => {
                let id = data.body._id;
                chai.request(server)
                    .put('api/issues/test')
                    .send({
                        _id: id,
                        created_by: 'you'
                    })
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.result, 'successfully updated');
                        assert.equal(res.body._id, id);
                        done();
                    })
            })
            .catch(err => done(err));
        
    })

    it('Update multiple fields on an issue: PUT request to /api/issues/test', (done) => {
        chai.request(server)
            .post('/api/issues/test')
            .send({
                issue_title: 'Login',
                issue_text: 'Login problem',
                created_by: 'iam',
            })
            .then((err, data) => {
                let id = data.body._id;
                chai.request(server)
                    .put('api/issues/test')
                    .send({
                        _id: id,
                        issue_title: 'logout',
                        issue_text: 'logout problem',
                        created_by: 'iam',
                    })
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.result, 'successfully updated');
                        assert.equal(res.body._id, id);
                        done();
                    })
            })
            .catch(err => done(err));
        
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
        chai.request(server)
            .post('/api/issues/test')
            .send({
                issue_title: 'Login',
                issue_text: 'Login problem',
                created_by: 'iam',
            })
            .then((err, data) => {
                let id = data.body.id;
                chai.request(server)
                    .delete('/api/issues/test')
                    .send({
                        _id: id
                    })
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.result, 'successfully deleted');
                        assert.equal(res.body._id, id);
                        done();
                    })
            })
            .catch(err => done(err));
        
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
