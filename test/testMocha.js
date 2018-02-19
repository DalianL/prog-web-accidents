const MongoDb = require('mongodb');

//Require the dev-dependencies
let chai = require('chai');
let expect = require("chai").expect;
let chaiHttp = require('chai-http');
let server = require('../Server/server.js');
var filter = server.filtrerByPosition;
let should = chai.should();

chai.use(chaiHttp);


describe('test filter function accident', () => {
    it('it should GET all the accidents', function (done) {
        var listAccident = [{"_id":"5a8ad3d9f4b9af5a3287c7ad","gravite":"3","departement":"06","adresse":"Route de Sclos","lon":7.347166480291503,"lat":43.8166912802915,"accidentId":"201600008233"},{"_id":"5a8ad3d9f4b9af5a3287bb5a","gravite":"3","departement":"59","adresse":"52 rue victor hugo","lon":3.066240180291502,"lat":50.6248617802915,"accidentId":"201600000004"}];
        var result = 150;
        var long = 7.0874964;
        var lat = 43.623908899999996;
        var rayon = 150;
        
        var resultTrue = [{"_id":"5a8ad3d9f4b9af5a3287c7ad","gravite":"3","departement":"06","adresse":"Route de Sclos","lon":7.347166480291503,"lat":43.8166912802915,"accidentId":"201600008233"}];
        var resultTest = server.filtrerByPosition(listAccident,lat,long,rayon);
        expect(resultTest).to.equal(resultTrue);
    });
});
