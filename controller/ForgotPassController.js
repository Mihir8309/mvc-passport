const registerTBL = require('../models/registerTBL');

const nodemailer = require('nodemailer');

const ForgotPassword = (req, res) => {
	return res.render('ForgotPassword');
}

const forgotemail = async (req, res) => {
	try {
		const forgotemail = req.body.forgotemail;
		let checkEmail = await registerTBL.findOne({ email: forgotemail });
		if (checkEmail) {
			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'mihirborsaniya8309@gmail.com',
					pass: 'lvrlqzewncuxzmmw'
				}
			});
			const generateOTP = () => {
				const digits = '0123456789';
				let OTP = "";
				for (let i = 0; i < 6; i++) {
					OTP += digits[Math.floor(Math.random() * 10)];
				}
				return OTP;
			}
			const sendOTP = (recipientEmail) => {
				const OTP = generateOTP();

				const mailOption = {
					from: 'mihirborsaniya8309@gmail.com',
					to: forgotemail,
					subject: 'One Time Password (OTP)',
					text: `Your OTP Is : ${OTP}`
				}
				transporter.sendMail(mailOption, (error, info) => {
					if (error) {
						console.log(error);
					}
					else {
						let obj = {
							OTP: OTP,
							email: forgotemail
						}
						res.cookie('userOTP', obj);
						console.log('Email Sent : ' + info.response);
						return res.redirect('/OTP');
					}
				})
			}
			const recipientEmail = forgotemail;
			sendOTP(recipientEmail);
		} else {
			req.flash('danger', 'Email Not Fetch');
			return res.redirect('back');
		}
	} catch (err) {
		if (err) {
			console.log(err);
			return false;
		}
	}
}

const OTP = (req, res) => {
	return res.render('OTP');
}

const sendOTP = (req, res) => {
	if (req.cookies.userOTP.OTP == req.body.OTP) {
		return res.redirect('/newPassword')
	} else {
		return res.redirect('back');
	}
}

const newPassword = (req, res) => {
	return res.render('newPassword');
}

const newPassPort = async (req, res) => {
	try {
		let email = req.cookies.userOTP.email;
		const { nPass, cPass } = req.body;
		if (cPass == nPass) {
			let updateEmail = await registerTBL.findOneAndUpdate({ email }, {
				password: nPass
			});
			if (updateEmail) {
				res.clearCookie('userOTP');
				return res.redirect('/')
			} else {
				console.log("Password is not update");
				return res.redirect('back')
			}
		} else {
			console.log("Confirm & New Password is wrong");
		}
	} catch (err) {
		if (err) {
			console.log(err);
			return false;
		}
	}
}

module.exports = {
	ForgotPassword,
	forgotemail,
	OTP,
	sendOTP,
	newPassword,
	newPassPort,
}