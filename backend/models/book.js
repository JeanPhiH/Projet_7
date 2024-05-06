const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	title: { type: String, required: true, validate: [/^[a-zA-Z0-9\-\s]+$/, 'Invalid title'] },
	author: { type: String, required: true, validate: [/^[a-zA-Z0-9\-\s]+$/, 'Invalid author'] },
	imageUrl: { type: String, required: true },
	year: { type: Number, required: true, validate: [/^[0-9]{1,4}$/, 'Invalid year'] },
	genre: { type: String, required: true, validate: [/^[a-zA-Z0-9\-\s]+$/, 'Invalid genre'] },
	ratings: [
		{
			userId: { type: String, required: true }, 
			grade: { type: Number, required: true },
		}
	],
	averageRating: { type: Number, required: true },
	// _id: from mongodb
});

module.exports = mongoose.model('Book', bookSchema);