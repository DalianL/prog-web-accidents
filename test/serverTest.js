var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../Server/server.js');
var should = chai.should();

chai.use(chaiHttp);


describe('GET TESTING', () => {

  it('should list all accidents ', function(done) {
    chai.request(server.app)
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });

it('should list all  Comments', function(done) {
    chai.request(server.app)
      .get('/getCommentary')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });

  it('should return  all accident around the @GIVEN position', function(done) {
    chai.request(server.app)
      .get('/getRouteByPosition')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });



  it('should add a comment about the @GIVEN accident', function(done) {
    chai.request(server.app)
      .get('/addCommentary?text='+'blablabla'+'&accidentId='+'201600000049'+'&auteur='+ 'Ahmed')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('result');
        res.body.result.should.be.a('array');
        res.body.result[10].should.have.property('accidentId');
        res.body.result[10].should.have.property('text');
        res.body.result[10].should.have.property('auteur');
        res.body.result[10].accidentId.should.equal('201600000049');
        res.body.result[10].text.should.equal('blablabla');
        res.body.result[10].auteur.should.equal('Ahmed');
        done();
      });
  });

  it('should return  all comments about the @GIVEN accident', function(done) {
    chai.request(server.app)
      .get('/getCommentaryById?accidentId='+'201600000049')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('result');
        res.body.result.should.be.a('array');
        res.body.result[0].should.have.property('accidentId');
        res.body.result[0].accidentId.should.equal('201600000049');
        done();
      });
  });

});