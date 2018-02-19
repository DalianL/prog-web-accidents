//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const MongoDb = require('mongodb');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../Server/server.js');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('accident', () => {
    /*
      * Test de recuperer un accident qaund la base est vide
      */
    describe('/GET accident', () => {
        it('it should GET all the accidents', (done) => {
            chai.request(server)
                .get('/getRouteByPosition')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

});