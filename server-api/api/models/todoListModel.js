'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// todolist schema

var TaskSchema = new Schema({
	name: {
		type:String,
		required: 'Kindly enter the name of the task'
	},
	created_date: {
		type: Date,
		default: Date.now,
		// required:"this field is required"
	},
	status: {
		type:[{
			type: String,
			enum: ['pending', 'ongoing', 'completed']
		}],
		default: ['pending']
	}
});

// questions set schema

module.exports = mongoose.model('Tasks', TaskSchema);