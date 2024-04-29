const Book = require('../models/book');

//GET BEST RATING
exports.getBestRating = (req, res, next) => {
  Book.find().sort({ averageRating: -1 }).limit(3)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};

//POST
exports.postRating = (req, res, next) => {

	const userId = req.auth.userId;
	Book.findOne({ _id: req.params.id })
	.then(book => {
		// Check if the user has already rated the book
		const userRating = book.ratings.find(rating => rating.userId === userId);
		if (userRating) {
			throw new Error('L’utilisateur a déjà noté ce livre.');
		}
		// Add the new rating to the book
		book.ratings.push({ 
			userId: userId, 
			grade: req.body.rating
		});

		// Update the average rating
		const totalRatings = book.ratings.length;
		const sumOfGrades = book.ratings.reduce((acc, cur) => acc + cur.grade, 0);
		const average = sumOfGrades / totalRatings;
		book.averageRating = average.toFixed(1);

		// Update the book in the database
		book.save()
			.then(() => res.status(200).json(book))
			.catch(error => res.status(500).json({ error: error.message }));
		
	})
	.catch(error => res.status(500).json({ error: error.message }));
}

