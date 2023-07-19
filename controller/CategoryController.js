const categoryTBL = require('../models/categoryTBL');


const category = async (req, res) => {
	try {
		let categorydata = await categoryTBL.find({});
		if (categorydata) {
			return res.render('category', {
				categorydata,
				single:""
			})
		} else {
			console.log("Record not found");
			return false;
		}
	} catch (err) {
		console.log(err);
		return false;
	}
}

const addCategory = async (req, res) => {
	try {
		const { editid, category } = req.body;
		if (editid) {
			let editdata = await categoryTBL.findByIdAndUpdate(editid, {
				category:category
			})
			if (editdata) {
				req.flash('success','Category Update Successfully')
				console.log("Category Update successfully");
				return res.redirect('/category')
			} else {
				console.log("Category not Update");
				return false;
			}
		}
		else {
			let addCategory = await categoryTBL.create({
				category: category,
			})
			if (addCategory) {
				req.flash('success','Category add Successfully')
				console.log("Category Add Successfully");
				return res.redirect('back');
			} else {
				console.log("Category can't add");
				return res.redirect('back');
			}
		}
	} catch (err) {
		console.log(err);
		return false;
	}
}

const deleteCategory = async (req, res) => {
	try {
		let id = req.query.id;
		let dltdata = await categoryTBL.findByIdAndDelete(id);
		if (dltdata) {
			req.flash("'success", "Delete Successfully");
			console.log("Delete Successfully");
			return res.redirect('back')
		} else {
			console.log("Data not Delete");
			return res.redirect('back');
		}
	} catch (err) {
		console.log(err);
		return false;
	}
}

const editCategory = async (req, res) => {
	try {
		let id = req.query.id;
		let single = await categoryTBL.findById(id);
		let allData = await categoryTBL.find({});
		if (single) {
			return res.render('category', {
				single,
				categorydata: allData,
			})
		} else {
			console.log("Record not found");
			return false;
		}
	} catch (err) {
		console.log(err);
		return false;
	}
}

module.exports = {
	category,
	addCategory,
	deleteCategory,
	editCategory
}