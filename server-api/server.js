var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
 //created model loading here
  QuestionModel = require('./api/models/QuestionModel'),
  AnswerModel = require('./api/models/AnswerModel'),
  bodyParser = require('body-parser');
  var cors = require('cors');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/QuestionSetDatabase')

app.use(cors()); // CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.status(404).send({url: req.originalUrl + ' not found'})	
});

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);