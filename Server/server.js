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
      result = filtrerByPosition(result, req.query.lat, req.query.lon, 150);
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
    console.log('saved to database', req.query)
    res.redirect('/getCommentary')
  })
})

app.delete('/deleteCommentary', (req, res) => {
  db.collection('commentary').deleteOne({ _id: new MongoDb.ObjectId(req.query.id) }, (err, result) => {
    if (err) {
      return res.send(500, err)
    } else {
      res.redirect('/getCommentary');
      console.log("Commentary", req.query.id, "suppressed successfully");
    }

  })
})

/**
 * OTHER FUNCTIONS
 */

var rad = function (x) {
  return x * Math.PI / 180;
};

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
    console.log("distance " + distance + " ,rayon " + rayon);
    if (distance <= rayon) {
      resultatAccidents.push(listAccident[accident]);
    }
  }
  return resultatAccidents;
}

/*function filtrerByPosition(listAccident, lat, lon, rayon) {
  var resultatAccidents = [];
  for (var accident in listAccident) {
    //calcul de la distance en km
    //ACOS(SIN(lat1)*SIN(lat2)+COS(lat1)*COS(lat2)*COS(lon2-lon1))*6371
    var distance = Math.acos(Math.sin(lat) * Math.sin(listAccident[accident].lat) + Math.cos(lat) * Math.cos(listAccident[accident].lat) * Math.cos(listAccident[accident].lon - lon)) * 6367445
    console.log("distance " + distance + " ,rayon " + rayon);
    if (distance <= rayon) {
      resultatAccidents.push(listAccident[accident]);
    }
  }
  return resultatAccidents;
}*/


module.exports = {
  app,
  filtrerByPosition
}
/**
app.post('/quotesquotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('A darth vadar quote got deleted')
  })
})
**/