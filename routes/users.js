const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');

router.get('/me', async (req, res) => {});

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User with this email is already registered');

	user = new User(req.body);
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(user.password, salt);
	user.password = hash;

	await user.save();
	res.send({
		id: user._id,
		email: user.email
	});
});

module.exports = router;
