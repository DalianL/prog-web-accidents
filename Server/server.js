const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const MongoDb = require('mongodb');
var fs = require('fs');

MongoClient.connect('mongodb://localhost:27017/accidentprojet', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 8000, () => {
    console.log('listening on 8000')
    console.log('results ok, ready for routing...');
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

//check if manager exists
app.get('/authen', (req, res) => {
  db.collection('managers').findOne({username:req.query.username,password:req.query.password}, (err, result) => {
    if (err) {
      return res.send(500, err)
    } else if (result == null) {
      res.send('Unauthorized');
    }else{
      res.send('Authorized');
    }
  })
})

/**
* ADD / DELETE ACCIDENT PART
**/
// Add Accident
app.get('/addAccident', function(req, res) {
  db.collection('accidents').aggregate(
    [
      {
        $group:
          {
            _id: "acId",
            accidentId: { $max: "$accidentId" }
          }
      }
    ]).toArray((err, resultAgreg) => {
    if (err) {
      return console.log(err);
    }
    else {
     // Adresse, departement, gravite, lon, lat, accidentId
     let newMaxId = parseInt(resultAgreg[0].accidentId) + 1;
     db.collection('accidents').save({adresse:req.query.adresse, gravite:req.query.gravite, lon:req.query.lon, lat:req.query.lat, 
      departement:req.query.departement,accidentId:(""+newMaxId)}, (err, result) => {
      if (err) return console.log(err)
      console.log('Accident saved to database with the id', ""+newMaxId);
      res.redirect('/')
      })
    }
  })
})

// Delete Accident
app.delete('/deleteAccident', (req, res) => {
  db.collection('accidents').deleteOne({ accidentId:req.query.accidentId }, (err, result) => {
    if (err) {
      return res.send(500, err)
    } else {
      res.redirect('/');
      console.log("Accident id", req.query.accidentId, "suppressed successfully");
    }
  })
})

/**
 * ROUTE POSITION PART
 */
app.get('/', (req, res) => {
  db.collection('accidents').find().toArray((err, result) => {
    if (err) return console.log(err)
    //res.render('index.ejs', {accidents: result})
    res.send({
      result
    });
  })
})

// Get client position from client gps
// then serve the corresponding results.
app.get('/getRouteByPosition', function (req, res) {
  //dbquery(req.query);
  db.collection('accidents').find({}).toArray((err, result) => {
    if (err) {
      return console.log(err);
    }
    else {
      result = filtrerByPosition(result, req.query.lat, req.query.lon, 5);
      //res.render('index.ejs', { accidents: result })
      res.send({ result });
    }
  })
})

/**
 * COMMENTARY PART
 */

app.get('/getCommentary', function (req, res) {
  db.collection('commentary').find().toArray((err, result) => {
    if (err) {
      return console.log(err);
    }
    else {
      //res.render('commentary.ejs', { commentary: result })
      res.send({ result });
    }
  })
})

app.get('/getCommentaryById', function (req, res) {
  var accId = req.query.accidentId;
  db.collection('commentary').find({ accidentId: accId }).toArray((err, result) => {
    if (err) {
      return console.log(err);
    }
    else {
      //res.render('commentary.ejs', { commentary: result })
      res.send({ result });
    }
  })
})

app.get('/addCommentary', function (req, res) {
  db.collection('commentary').save(req.query, (err, result) => {
    if (err) return console.log(err)
    //console.log('New commentary saved to database');
    res.redirect('/getCommentary')
  })
})

app.delete('/deleteCommentary', (req, res) => {
  db.collection('commentary').deleteOne({ _id: new MongoDb.ObjectId(req.query.id) }, (err, result) => {
    if (err) {
      return res.send(500, err)
    } else {
      res.redirect('/getCommentary');
      //console.log("Commentary", req.query.id, "suppressed successfully");
    }
  })
})

/**
 * OTHER FUNCTIONS
 */
var rad = function (x) {
  return x * Math.PI / 180;
};

// Filter to have best result from our current position and a specified rayon
function filtrerByPosition(listAccident, lat, lon, rayon) {
  var resultatAccidents = [];
  for (var accident in listAccident) {
      var R = 6378137; // Earth’s mean radius in meter
      var dLat = rad(listAccident[accident].lat - lat);
      var dLong = rad(listAccident[accident].lon - lon);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(lat)) * Math.cos(rad(listAccident[accident].lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var distance = (R * c)/1000; // the distance in km
      if (distance <= rayon) {
        resultatAccidents.push(listAccident[accident]);
    }
  }
  return resultatAccidents;
}

// Export module functions
module.exports = {
  app,
  filtrerByPosition
}