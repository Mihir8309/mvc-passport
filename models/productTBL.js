const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	categoryId: {
		type: mongoose.Types.ObjectId,
		ref:'categoryCrud'
	},
	subcategoryId: {
		type: mongoose.Types.ObjectId,
		ref:'subcategory'
	},
	exsubcategoryId: {
		type: mongoose.Types.ObjectId,
		ref:'exSubCategory'
	},
	ProductName: {
		type: String,
		require:true
	},
	ProductQty: {
		type: String,
		require: true
	},
	ProductPrice: {
		type: String,
		require: true
	},
	ProductDescription: {
		type: String,
		require: true
	},
	image: {
		type: String,
		require: true
	}
})
const crud = mongoose.model('product', productSchema);
module.exports = crud;