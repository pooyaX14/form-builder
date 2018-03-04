'use strict';

var mongoose = require('mongoose'),
    responseData = mongoose.model('responseData');

exports.save_response_details = function(req, res) {
  	console.log("INSIDE Response wala controller");
  	var formResponseData = new responseData(req.body)
  	formResponseData.save(function(err, response_values){
    		if(err){
    			 res.send(err);
    		}
    		res.json(response_values);
  	});
}

exports.get_response_details = function(req, res) {
  responseData.find({}, function(err, response) {
    if (err)
      res.send(err);
    res.json(response);
  });
};

exports.read_response_answers = function(req, res) {
  console.log("req.params.responseFormId", req.params.responseFormId);  
  responseData.find({form_id: req.params.responseFormId}, function(err, answers) {
    if(err){
      res.send(err);
    }
    res.json(answers);
  });
};