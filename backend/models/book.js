const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
	year: { type: Number, required: true },
	genre: { type: String, required: true },
	description: { type: String, required: true },
	rating: { type: Number, required: true },
	imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Book', bookSchema);