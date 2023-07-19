const express = require('express');

const port = 9000;

const app = express();

const db = require('./config/mongoose');

const path = require('path');
 
const cookie = require('cookie-parser');

const bodyParser = require('body-parser');

const passport = require('passport');

const session = require('express-session');

const flash = require('connect-flash');

const passportLocal = require('./config/passport-local');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static(path.join(__dirname, ('uploads'))));

app.use(session({
	secret: 'Blog_project',
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60
	}
}));

// app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthentication);

app.use(cookie());

app.use(flash());

app.use(function (req, res, next) {
	res.locals.message = {
		'success': req.flash('success'),
		'danger': req.flash('danger')
	}
	next();
});


app.use('/', require('./routes'));

app.set('view engine', 'ejs');

app.listen(port, (err) => {
	if (err) {
		console.log(err);
		return false;
	}
	console.log(("Server is Run : "+port));
})