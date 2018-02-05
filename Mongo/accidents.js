

/*var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

(function main() {
    console.info('populating db with department and region data...');
    //fs.readFile(process.argv[2], populate);//rempli la base de données

}());

function createCollection(){
    MongoClient.connect('mongodb://127.0.0.1:27017/admin',function(err,database){
    if(err)
    {
        console.error('big oops');
    }
    else{
        console.log('ready ');
    }
    })
}

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
}*/
