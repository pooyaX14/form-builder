 'use strict';

module.exports = function(app) {
  var form_values = require('../controllers/questionController');
  var response_value = require('../controllers/answerController');
  

  app.route('/form')
    .post(form_values.save_form_details)

//get form by giving some specific id
  app.route('/form/:formId')
    .get(form_values.fetch_form_byId)
    .delete(form_values.delete_question);

  app.route('/responsedata')
    .post(response_value.save_response_details)
  
  // app.route('/responseData/:responseFormId')
  //   .get(response_value.read_response_answers)

};

