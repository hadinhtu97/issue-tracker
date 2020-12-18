'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;

chai.use(chaiHttp);

const server = 'http://localhost:3000';

describe('Functional Test', () => {

    it('Issue with every field: POST request to /api/issues/test', (done) => {
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

})