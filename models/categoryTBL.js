const mongoose = require('mongoose');

const crudschema = mongoose.Schema({
	category: {
		type: String,
		required :true
	}
})

const crud = mongoose.model('categoryCrud',crudschema);

module.exports = crud;