'use strict';

var mongoose = require('mongoose'),
    formData = mongoose.model('formData');

exports.save_form_details = function(req, res) {
  	console.log("INSIDE FORM DETAILS");
  	console.log(req.body);
  	var formDatabody = new formData(req.body)
  	formDatabody.save(function(err, form_values){
    		if(err){
    			 res.send(err);
    		}
    		res.json(form_values);
  	});
}

// exports.list_form_details = function(req, res) {
//   console.log("inside list_all_tasks", req);
//   formData.find({}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };

exports.get_form_details = function(req, res) {
  // console.log("inside list_all_tasks", req);
  formData.find({}, function(err, response) {
    if (err)
      res.send(err);
    res.json(response);
  });
};

exports.fetch_form_byId = function(req, res) {
  console.log("req.params.formId", req.params.formId);  
  formData.findById(req.params.formId, function(err, task) {
    if(err){
      res.send(err);
    }
    res.json(task);
  });
};


// exports.get_dummy_data= function(req, res) {
//   // console.log("inside list_all_tasks", req);
//   dummy_data.find({}, function(err, response) {
//     if (err)
//       res.send(err);
//     res.json(response);
//   });
// };

exports.delete_question = function(req, res) {
  // console.log("req.params.taskId", req.params.taskId);
  formData.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted', really: 'yes' });
  });
};
