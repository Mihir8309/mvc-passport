const registerTBL = require('../models/registerTBL');

const register = (req, res) => {
	return res.render('register');
}

const registerData = async (req, res) => {
	try {
		const { name, email, password, cpassword } = req.body;

		console.log(req.body);
		if (password == cpassword) {
			let userdata = await registerTBL.create({
				name: name,
				email: email,
				password: password
			})
			if (userdata) {
				console.log("User Successfully Add");
				return res.redirect('/');
			} else {
				console.log("User not Add");
				return res.redirect('back')
			}
		} else {
			console.log("Password & confirm password not match");
			return false;
		}
	} catch (err) {
		console.log(err);
		return false;
	}
}

module.exports = {
	register,
	registerData
}