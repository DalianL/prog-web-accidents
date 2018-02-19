/*var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../Server/server.js');
var should = chai.should();

chai.use(chaiHttp);


describe('/GET Commentary', () => {
it('should lists all  Commentary', function(done) {
    chai.request(server)
      .get('/getCommentary')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
});

describe('/GET accident', () => {
  it('should list all accidents', function(done) {
    chai.request(server)
      .get('/getRouteByPosition')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
});*/