const chai = requrie('chai');
const chaiHttp = require('chai-http');

const assert = chai.assert;
const server = 'server';
chai.use(chaiHttp);

describe('functional tests', () => {

    describe('functional test 1', () => {

        it('test1', (done) => {
            chai.request(server)
                .get('/api')
                .query({ sample: 'sample1' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    // assert
                    // done();
                })
        })

        it('test2', (done) => {
            chai.request(server)
                .get('/api')
                .query({ sample: 'sample2' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    // assert
                    // done();
                })
        })

    })

})