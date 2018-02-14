const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
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
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
  db.collection('accidents').find( { departement:req.query.departement} ).toArray((err, result) => {
    if (err) {
      return console.log(err);
    }
    else {
     result = filtrerByPosition(result,req.query.lat,req.query.lon,150);
    //res.render('index.ejs', { accidents: result })
    res.send({result});
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
      res.render('commentary.ejs', { commentary: result })
      //res.send({result});
    }
  })
})

app.get('/getCommentaryById', function (req, res) {
  var accId = req.query.accidentId;
  db.collection('commentary').find( {accidentId:accId} ).toArray((err, result) => {
    if (err) {
      return console.log(err);
    }
    else {
      res.render('commentary.ejs', { commentary: result })
      //res.send({result});
    }
  })
})

app.post('/addCommentary', function(req, res) {
  db.collection('commentary').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/getCommentary')
  })
})

/**
 * OTHER FUNCTIONS
 */

function dbquery(position) {
  console.log("You requested" + position.lat + " " + position.lon);
}

function filtrerByPosition(listAccident, lat, lon, rayon) {
  var resultatAccidents = [];
  for (var accident in listAccident) {
    //calcul de la distance en km
    //ACOS(SIN(lat1)*SIN(lat2)+COS(lat1)*COS(lat2)*COS(lon2-lon1))*6371
    var distance = Math.acos(Math.sin(lat) * Math.sin(listAccident[accident].lat) + Math.cos(lat) * Math.cos(listAccident[accident].lat) * Math.cos(listAccident[accident].lon - lon)) * 6371
    console.log("distance " + distance + " ,rayon " + rayon);
    if (distance <= rayon) {
      resultatAccidents.push(listAccident[accident]); 
    }
  }
  return resultatAccidents;
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