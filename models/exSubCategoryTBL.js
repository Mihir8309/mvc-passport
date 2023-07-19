const mongoose = require('mongoose');

const exsubschema = mongoose.Schema({
	categoryId: {
		type: mongoose.Types.ObjectId,
		ref:'categoryCrud'
	},
	subcategoryId: {
		type:mongoose.Types.ObjectId,
		ref:'subcategory'
	},
	exsubcategory: {
		type: String,
		required :true
	}
})

const crud = mongoose.model('exSubCategory',exsubschema);

module.exports = crud;