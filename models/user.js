const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		minlength: 5,
		required: true
	}
});

const User = new mongoose.model('User', userSchema);

function validateUser(user) {
	const schema = {
		email: Joi.string().required().email(),
		password: Joi.string().required().min(5)
	};

	return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
