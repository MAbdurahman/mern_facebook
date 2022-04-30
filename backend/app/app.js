//**************** imports ****************//
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


//**************** setting up config file ****************//
if (process.env.NODE_ENV !== 'PRODUCTION')
	require('dotenv').config({ path: 'backend/config/config.env' });
//**************** variables ****************//
const app = express();

//**************** middleware****************//
if (process.env.NODE_ENV !== 'PRODUCTION') {
	app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});
//**************** import all routes ****************//


//**************** app routes ****************//
app.get('/api/v1', (req, res) => {
	res.status(200).json({
		requestedAt: req.requestTime,
		app: 'mern_facebook',
		message: 'Welcome to MERN Facebook!',
	});
});

app.all('*', (req, res, next) => {
	next(
		new Error(`Cannot find ${req.originalUrl} on this server!`, 404)
	);
});
//**************** handle errors middleware ****************//

module.exports = app;
