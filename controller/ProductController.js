const categoryTBL = require('../models/categoryTBL');
const subCategoryTBL = require('../models/subCategoryTBL');
const exSubCategoryTBL = require('../models/exSubCategoryTBL');
const productTBL = require('../models/productTBL');

const fs = require('fs');



const product = async (req, res) => {
	try {
		let category = await categoryTBL.find({});
		let subcategory = await subCategoryTBL.find({}).populate('categoryId');
		let exsubcategory = await exSubCategoryTBL.find({}).populate('subcategoryId');
		let product = await productTBL.find({});

			
		return res.render('product', {
			category,
			subcategory,
			exsubcategory,
			product
		});	
	} catch (err) {
		console.log(err);
		return false;
	}
}

const addproduct = async (req, res) => {
	try {
		const { category, subcategory,exsubcategory, ProductName, ProductQty, ProductPrice, ProductDescription } = req.body;
		const trimmedCategoryId = category.trim();
		const trimmedsubCategoryId = subcategory.trim();
		const trimmedexsubcategoryId = exsubcategory.trim();
		let image = ""
		if (req.file) {
			image = req.file.path
		}
		if (!ProductName || !ProductQty || !ProductPrice || !ProductDescription || !image) {
			req.flash('danger', "Fill  all data");
			console.log("Fill all data");
			return res.redirect('/product')
		}
		console.log(req.file);
		let data = await productTBL.create({
			categoryId: trimmedCategoryId,
			subcategoryId: trimmedsubCategoryId,
			exsubcategoryId: trimmedexsubcategoryId,
			ProductName : ProductName,
			ProductQty : ProductQty,
			ProductPrice : ProductPrice,
			ProductDescription: ProductDescription,
			image: image
		})
		if (data) {
			console.log(req.body);
 			req.flash('success', "Data Successfully Add");
			console.log("Product add Successfully");
			return res.redirect('back')
		} else {
			console.log("Product not add");
			return res.redirect('back')
		}
	} catch (err) {
		console.log(err);
		return false;
	}
}

const productview = async (req, res) => {
	try {
		let category = await categoryTBL.find({});
		let subcategory = await subCategoryTBL.find({});
		let exsubcategory = await exSubCategoryTBL.find({});
		let productData = await productTBL.find({}).populate('categoryId').populate('subcategoryId').populate('exsubcategoryId');

		if (productData) {
			return res.render('productview', {
				productData
			});
		} else {
			console.log("Record not fetch");
			return false;
		}
	} catch (err) {
		console.log(err);
		return false;
	}
}

module.exports = {
	product,
	addproduct,
	productview
}