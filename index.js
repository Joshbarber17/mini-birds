var express = require('express');
var bodyParser= require('body-parser');
var cors = require('cors');
var mongojs = require('mongojs')
var app = express();
app.use(bodyParser.json());
var port = 2020;
var db = mongojs('bird-sightings');
var collection = db.collection('sightings');
app.listen(port, function(){
  console.log('listening on port ' + port);
})

app.get("/api/sighting", function(req, res, next){
  if (req.query.region) {
    collection.find({region: req.query.region}, function(err, response){
      if(err) {
        send(err)
      }
      else {
        res.status(200).send(response);
      }
    })
  }
  else if (req.query.order) {
    collection.find({order: req.query.order}, function(err, response){
      if(err) {
        send(err)
      }
      else {
        res.status(200).send(response);
      }
    })
  }
  else {
    collection.find(function(err, response){
      res.status(200).send(response)
    })
  }
});
app.post("/api/sighting", function(req, res, next){
  collection.insert(req.body, function(err, response){
    res.status(200).send(response)
  })
});
app.put("/api/sighting", function(req, res, next){
  if (req.query) {
    collection.update(req.query, {$set: req.body}, function(err, response){
      res.status(200).send(response)
    })
  }
});
app.delete("/api/sighting", function(req, res, next){
  if (req.query) {
    collection.remove(req.query, function(err, response){
      res.status(200).send(response)
    })
  }
});
