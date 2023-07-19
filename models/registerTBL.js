const mongoose = require('mongoose');

const crudschema = mongoose.Schema({
	name: {
		type: String,
		required:true
	},
	email: {
		type: String,
		required:true
	},
	password: {
		type: String,
		required:true
	}
})

const crud = mongoose.model('crud', crudschema);

module.exports = crud;