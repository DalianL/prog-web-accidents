var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../Server/server.js');
var should = chai.should();

chai.use(chaiHttp);



it('should list ALL Commentary on /getCommentary GET', function(done) {
    chai.request(server)
      .get('/getCommentary')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('should list ALL Routes on  /getRouteByPosition GET', function(done) {
    chai.request(server)
      .get('/getRouteByPosition')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });