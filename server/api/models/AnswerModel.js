'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResponseSchema = new Schema({
	form_id: {
		type: String
	},
	creationDate: {
		type: Date,
		default: Date.now,
	},
	form_title: {
		type: String,
		default: "Untitled title"
	},
	form_description: {
		type: String,
		default: "Untitled form description"
	},
	responses: [
		{
			question: String,
			content_type: {
				type: String,
				default: "answer"
			},
			answer: String				

		}
	]
});

module.exports = mongoose.model('responseData', ResponseSchema)