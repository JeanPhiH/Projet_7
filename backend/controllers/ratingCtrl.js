const Book = require('../models/book');

//POST
exports.postRating = (req, res, next) => {
	Book.findOne({ _id: req.params.id })
		.then(book => {
			const rating = req.body.rating;
			book.rating = (book.rating * book.ratingCount + rating) / (book.ratingCount + 1);
			book.ratingCount += 1;
			book.save();
			res.status(201).json({ message: 'Rating added !'});
		}
	)
		.catch(error => res.status(400).json({ error }));
};

//GET
exports.getBestRating = (req, res, next) => {
	Book.find()
		.sort({ rating: -1 })
		.limit(3)
		.then(ratings => res.status(200).json(ratings))
		.catch(error => res.status(400).json({ error }));
}