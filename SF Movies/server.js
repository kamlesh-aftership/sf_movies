var express = require('express');
var bodyParser =require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sfmovies');

var app  = express();
var MoviesModel = require('./models/MovieModel');

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

app.post("/location",function(req,res){
  var model = new MoviesModel(req.body);
  model.save(function(err,movie){
    if(err) console.log("err:"+err);
    console.log(movie);
    res.send(movie);
  })
})

app.get("/location/:name",function(req,res){
	MoviesModel.find({title:req.params.name},function(err,movie){
		if(err)  res.send(500,{error:err});
		res.send(movie);
	});
});

app.get('/location',function(req, res){
  MoviesModel.find(function(err, movies) {
    if (!movies) {
      return res.send(err);
    }
    res.send(movies);
  });
});

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;