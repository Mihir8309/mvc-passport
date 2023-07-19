const mongoose = require('mongoose');

const crudschema = mongoose.Schema({
	title: {
		type: String,
		require:true
	},
	description: {
		type: String,
		require:true
	},
	image: {
		type: String,
		require:true
	}
})

const crud = mongoose.model('BlogCrud', crudschema);
module.exports = crud;