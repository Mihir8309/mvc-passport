const categoryTBL = require('../models/categoryTBL');

const subCategoryTBL = require('../models/subCategoryTBL');

const SubCategory = async (req, res) => {
	try {
		let category = await categoryTBL.find({});
		let subcategory = await subCategoryTBL.find({}).populate('categoryId');

		console.log(subcategory);
		return res.render('sub_category', {
			category,
			subcategory,
			single: ""
		})
	} catch (err) {
		console.log(err);
		return false
	}
}

const addSubCategory = async (req, res) => {
	try {
		const { category, subcategory } = req.body;
		let addSubCategory = await subCategoryTBL.create({
			categoryId: category,
			subcategory: subcategory
		})
		if (addSubCategory) {
			console.log("Sub-Category add Successfully");
			return res.redirect('back')
		} else {
			console.log("Sub-Category can't add");
			return res.redirect('back')
		}
	} catch (err) {
		console.log(err);
		return false;
	}
}


module.exports = {
	SubCategory,
	addSubCategory,
}