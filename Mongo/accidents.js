var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017/admin";
const dbName = "accidentprojet";
const assert = require('assert');

/**
(function main() {
    console.info('populating db with department and region data...');
    //fs.readFile(process.argv[2], createCollection);//rempli la base de données

}());
**/

function createCollection(fileName){
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
    .then(collection => {
        // collection resolved, insert some documents
        const obj1 = {adresse : "paris 20 rue exemple", gravite : "grave" };
        const obj2 = {adresse : "marseille 15 rue toto", gravite : "mortelle" };
        const obj3 = {adresse : "nice 15 avenue gorbella", gravite : "faible" };
        const result = collection.insertMany([
            {_id : 1, adresse : "paris 20 rue exemple", lat : 110, lon : 200, gravite : "grave"}, 
            {_id : 2, adresse : "marseille 15 rue toto", lat : 110, lon : 200, gravite : "mortelle"}, 
            {_id : 3, adresse : "nice 15 avenue gorbella", lat : 100, lon : 200, gravite : "faible"}
        ]);
        console.log("The database has been filled")
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
        var docs = collexion.find({'a': 3}).toArray();
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

createCollection();
//findDocuments();

/**
function populate(err, data) {
    var json, csv;
    if (err) {
        console.error('big oops reading %s', process.argv[2]);
        throw err;
    }

    Papa.parse(data, {
        complete: function (results) {
            csv = results;
            //Est appelé quand le c'est fini
            MongoClient.connect('mongodb://127.0.0.1:27017/admin',
                function (err, db) {
                    if (err) {
                        throw err;
                    }
                    //Transformation du csv en json pour l'insertion

                    json = jsonifyDepts(csv)
                    // Vide l'ancienne base
                    var collection = db.collection('accidents');
                    collection.drop();
                    collection.insert(json, function (err, docs) {
                        if (err) {
                            throw err;
                        }
                        // everything inserted correctly into the database it seems
                        console.info('finished populating db with json and regions');
                        console.info('should have inserted %d elements into db', docs.length);

                        // now that data has been inserted, let's shut it down
                        db.close();
                    });
                });
        }
    });
}

function jsonifyDepts(depts) {
    var lst = [], d, dept;
    for (d in depts) {
        if (depts.hasOwnProperty(d)) {
            dept = depts[d];
            d = (d + 1 < 10 ? '0' : '') + d;
            lst.push({
                number: d,
                name: dept.name,
                region: dept.region
            });
        }
    }
    return lst;
}
**/
