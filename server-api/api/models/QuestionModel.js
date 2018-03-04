'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FormSchema = new Schema({
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
	questions: [
		{
			content: String,
			content_type: {
				type: String,
				default: "question"
			},
			options: Object,
			answer_type: String,

		}
	]
});

module.exports = mongoose.model('formData', FormSchema)