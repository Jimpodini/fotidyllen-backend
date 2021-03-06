const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Incorrect e-mail or password');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Incorrect e-mail or password');

	const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
	res.header([ 'x-auth-token', token ]).send(token);
});

function validate(req) {
	const schema = {
		email: Joi.string().required().email(),
		password: Joi.string().required()
	};

	return Joi.validate(req, schema);
}

module.exports = router;
