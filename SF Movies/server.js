'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sfmovies');

const app = express();
const MoviesModel = require('./models/MovieModel');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.post('/location', function (req, res) {
	let model = new MoviesModel(req.body);
	model.save(function (err, movie) {
		if (err) console.log('err:' + err);
		res.send(movie);
	});
});

app.get('/location/:name', function (req, res) {
	MoviesModel.find({title: req.params.name}, function (err, movie) {
		if (err) res.send(500, {error: err});
		res.send(movie);
	});
});

app.get('/location', function (req, res) {
	MoviesModel.find(function (err, movies) {
		if (!movies) {
			return res.send(err);
		}
		return res.send(movies);
	});
});

app.listen('8081');
console.log('Server started on port 8081');
exports = module.exports = app;
