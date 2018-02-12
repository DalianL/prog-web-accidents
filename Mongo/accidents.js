var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017/admin";
const dbName = "accidentprojet";
const assert = require('assert');

(function main() {
    console.info('populating db with department and region data...');
    //fs.readFile(process.argv[2], createCollection);//rempli la base de données
    var obj = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
    createCollection(obj);
}());


function createCollection(json) {
    MongoClient.connect(url)
        .then(c => {
            // Connexion ok
            client = c;
            console.log('Connected successfully to server', url);
            const db = client.db(dbName);
            return db;
        })
        .then(db => {
            // db resolved, drop the collection from db
            //db.dropCollection('accidents');
            return db;
        }, err => {
            console.log(" " + err);
        })
        .then(db => {
            // collection drop resolved, create new collection
            const collection = db.collection('accidents');
            return collection;
        })
        .then(collection => {
            // collection resolved, insert some documents
            /*const obj1 = { adresse: "paris 20 rue exemple", gravite: "grave" };
            const obj2 = { adresse: "marseille 15 rue toto", gravite: "mortelle" };
            const obj3 = { adresse: "nice 15 avenue gorbella", gravite: "faible" };
            const result = collection.insertMany([
                { "data": obj1 }, { "data": obj2 }, { "data": obj3 }
            ]);
            console.log("The database has been filled !")*/
            console.log(json);
            const result = collection.insertMany(json);
            console.log('Donnees inserrees');
            return result;  // a promised insertion result
        })
        .then(() => {
            client.close();
        })
        .catch(err => {
            console.error('Whoopsie - something gotcha...');
            console.error(err);
        });
}

function findDocuments() {
    MongoClient.connect(url)
        .then(c => {
            // Connexion ok
            client = c;
            console.log('Connected successfully to server', url);
            const db = client.db(dbName);
            return db;
        })
        .then(db => {
            // db resolved, drop the collection from db
            //db.dropCollection('accidents');
            return db;
        }, err => {
            console.log(" " + err);
        })
        .then(db => {
            // collection drop resolved, create new collection
            const collection = db.collection('accidents');
            collexion = collection;
            const docs = collexion.find({}).toArray();
            return collexion;
        })
        .then(() => {
            // resolved finding documents, find some filtered documents
            var docs = collexion.find({ 'a': 3 }).toArray();
            return docs;
        })
        .then(docs => {
            // resolved finding documents, print them
            // assert.equal(err, null);
            console.log('Found the following records');
            console.log(docs);
            client.close();
        });
}
//{"data" : {"Adresse": "value","lat:"value,}}