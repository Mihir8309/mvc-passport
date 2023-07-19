const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/project_of_mvc_passport');

const db = mongoose.connection;

db.on('connected', (err) => {
	if (err) {
		console.log(err);
		return false;
	}	
	console.log("DB is connected");
})

module.exports = db;