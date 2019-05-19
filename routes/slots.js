const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Slot, validate } = require('../models/slot');

router.get('/', async (req, res) => {
	const slots = await Slot.find({});
	res.send(slots);
});

router.post('/', async (req, res) => {
	console.log(req.body)
	const { error } = validate(req.body);
	if (error) {
		res.send(error.details[0].message);
		console.log(error);
		return;
	}


	const slot = new Slot({
		date: req.body.date,
		startingTime: req.body.startingTime,
		endTime: req.body.endTime,
		booked: false,
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email
	});

	await slot.save();
	res.send(slot);
});

router.put('/:id', async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).send('Not a valid ObjectID');
	}
	// find slot
	const slot = await Slot.findOneAndUpdate({ _id: req.params.id }, { booked: true });
	// if not found
	if (!slot) {
		res.status(404).send(`Slot with id ${id} is not found`);
	}

	// validate body
	// if error..

	// update slot

	res.send(slot);
	// const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
	//     new: true
	//   });
	//const slot = await Slots.findById(req.body._id).then(res.send(slot)).catch((err) => res.send(err));
});

module.exports = router;
