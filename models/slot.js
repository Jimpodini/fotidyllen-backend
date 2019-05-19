const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const slotsSchema = new mongoose.Schema({
	date: { type: String, required: true },
	startingTime: { type: String, required: true },
	endTime: { type: String, required: true },
	booked: { type: Boolean, required: true },
	name: { type: String },
	phone: { type: Number },
	email: { type: String }
});

const schema = {
	date: Joi.string().required(),
	startingTime: Joi.string().required(),
	endTime: Joi.string().required(),
	booked: Joi.boolean(),
	name: Joi.string(),
	phone: Joi.number(),
	email: Joi.string()
};

function validateSlot(slot) {
	return Joi.validate(slot, schema);
}

const Slot = mongoose.model('Slot', slotsSchema);

exports.Slot = Slot;
exports.validate = validateSlot;
