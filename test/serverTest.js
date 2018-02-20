var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../Server/server.js');
var should = chai.should();

chai.use(chaiHttp);
describe('GET TESTING', () => {

  it('authenfication of the @GIVEN manager,should return Unauthorized ', function(done) {
    chai.request(server.app)
      .get('/authen?username='+'Manager'+'&password='+'Manager')
      .end(function(err, res){
        res.should.have.status(200);
        res.text.should.be.equal('Unauthorized');
        done();
      });
  });

  it('authenfication of the @GIVEN manager,should return Authorized ', function(done) {
    chai.request(server.app)
      .get('/authen?username='+'Ahmed'+'&password='+'pass')
      .end(function(err, res){
        res.should.have.status(200);
        res.text.should.be.equal('Authorized');
        done();
      });
  });

  it('should list all accidents ', function(done) {
    chai.request(server.app)
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('result');
        res.body.result.should.be.a('array');
        done();
      });
  });

it('should list all comments', function(done) {
    chai.request(server.app)
      .get('/getCommentary')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return all accident around the @GIVEN position', function(done) {
    chai.request(server.app)
      .get('/getRouteByPosition?lat='+'50.6371469802915'+'&lon='+'3.060621980291502')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('result');
        res.body.result.should.be.a('array');
        res.body.result[1].should.have.property('accidentId');
        res.body.result[1].should.have.property('adresse');
        res.body.result[1].should.have.property('lon');
        res.body.result[1].should.have.property('lat');
        res.body.result[1].accidentId.should.equal('201600000005');
        res.body.result[1].adresse.should.equal('rue Joliot curie');
        res.body.result[1].lon.should.equal(3.033962180291502);
        res.body.result[1].lat.should.equal(50.6218258302915);       
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
        var x = res.body.result.length;
        res.body.result[x-1].should.have.property('accidentId');
        res.body.result[x-1].should.have.property('text');
        res.body.result[x-1].should.have.property('auteur');
        res.body.result[x-1].accidentId.should.equal('201600000049');
        res.body.result[x-1].text.should.equal('blablabla');
        res.body.result[x-1].auteur.should.equal('Ahmed');
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