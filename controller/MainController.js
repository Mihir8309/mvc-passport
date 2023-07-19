const blogTBL = require('../models/blogTBL');

const fs = require('fs');

const login = (req, res) => {
	if (res.locals.users) {
		return res.redirect('/dashboard')
	}
	return res.render('login');
}

const dashboard = (req, res) => {
	return res.render('dashboard');
}

const loginData = (req, res) => {
	return res.redirect('/dashboard');
}

const logout = (req, res) => {
	req.logout((err) => {
		console.log(err);
		return false;
	})
	return res.redirect('/');
}

const addblog = (req, res) => {
	return res.render('addblog', {
		single: ""
	})
}

const insertdata = async (req, res) => {
	try {
		const { editId, title, description } = req.body
		if (editId) {
			if (req.file) {
				if (!title || !description) {
					console.log("Enter All Data");
					return res.redirect('/')
				}
				let deleteImg = await blogTBL.findById(editId)
				if (deleteImg) {
					fs.unlinkSync(deleteImg.image)
				}
				else {
					console.log("image not delete");
					return false
				}
				let image = "";
				if (req.file) {
					image = req.file.path
				}
				let updatedata = await blogTBL.findByIdAndUpdate(editId, {
					title: title,
					description: description,
					image: image
				})
				if (updatedata) {
					console.log("Edit Done");
					return res.redirect('/viewblog')
				}
				else {
					console.log("Not Edited");
					return false
				}
			}
			else {
				image = "";
				let singledata = await blogTBL.findById(editId);
				if (!title || !description) {
					console.log("Enter All Data");
					return res.redirect('back')
				}
				if (singledata) {
					image = singledata.image;
					let updatedata = await blogTBL.findByIdAndUpdate(editId, {
						title: title,
						description: description,
						image: image
					})
					if (updatedata) {
 						console.log("Edit Done");
						return res.redirect('/viewblog')
					}
					else {
						console.log("Not Edited");
						return false
					}
				}
			}
		}
		else {
			let image = "";
			if (req.file) {
				image = req.file.path
			}
			if (!title || !description || !image) {
 				console.log("Enter All data");
				return res.redirect('/addblog')
			}
			let data = await blogTBL.create({
				title: title,
				description: description,
				image: image
			})
			if (data) {
 				console.log("Data Successfully Add");
				return res.redirect('back');
			}
			else {
				console.log(err);
				return res.redirect('back');
			}
		}
	}
	catch (err) {
		if (err)
			console.log(err);
		return false
	}
}


const viewblog = async (req, res) => {
	try {
		let blogData = await blogTBL.find({});
		if (blogData) {
			return res.render('viewblog', {
				blogData
			});
		}
	} catch (err) {
		if (err) {
			console.log(err);
			return false;
		}
	}
}

const deletedata = async (req, res) => {
	try {
		let id = req.query.id
		let deleteImg = await blogTBL.findById(id)
		if (deleteImg) {
			fs.unlinkSync(deleteImg.image)
 			console.log("Image successfully remove");
		} else {
			console.log("Image can't remove");
			return false
		}
		let dltdata = await blogTBL.findByIdAndDelete(id)
		if (dltdata) {
			console.log("Data successfully Delete");
			return res.redirect('back')
		} else {
			console.log("Data can't Delete");
			return res.redirect('back')
		}
	} catch (err) {
		if (err) {
			console.log(err);
			return false;
		}
	}
}

const editdata = async (req, res) => {
	try {
		let id = req.query.id
		let single = await blogTBL.findById(id)
		if (single) {
			return res.render('addblog', {
				single
			})
		} else {
			console.log("Record is not fetch");
			return false;
		}
	} catch (err) {
		if (err) {
			console.log(err);
			return false;
		}
	}
}

module.exports = {
	login,
	dashboard,
	loginData,
	logout,
	addblog,
	insertdata,
	viewblog,
	deletedata,
	editdata,
}