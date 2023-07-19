const registerTBL = require('../models/registerTBL');

const profile = (req, res) => {
	return res.render('profile')
}

const changeprofile = async (req, res) => {
	try {
		const { updateId, name, email, password } = req.body;
			let updatedata = await registerTBL.findByIdAndUpdate(updateId, {
				name: name,
				email: email,
				password:password
			})
			if (updatedata) {
				console.log("Your Profile is Update");
				return res.redirect('back')
			} else {
				console.log("Profile can't Update");
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
	profile,
	changeprofile
}