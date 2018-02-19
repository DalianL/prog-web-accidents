const MongoDb = require('mongodb');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../Server/server.js');
var filter = server.filtrerByPosition;
let should = chai.should();

chai.use(chaiHttp);

/*
  * Test de recuperer un accident qaund la base est vide
  */
describe('/GET accident', () => {
    it('it should GET all the accidents', function (done) {
        chai.request(server)
            .get('/getRouteByPosition')
            .end(function(err, res){
                res.should.have.status(200);
                //res.should.be.json;
                //res.body.should.be.a('array');
                done();
            });
    });
});

describe('filter accident', () => {
    
    it('it should GET all the accidents', function (done) {
        chai.request(server)
            .get('/getRouteByPosition')
            .end(function(err, res){
                res.should.have.status(200);
                //res.should.be.json;
                //res.body.should.be.a('array');
                done();
            });
    });
});
