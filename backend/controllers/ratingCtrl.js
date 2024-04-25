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
		// Vérifier si l'utilisateur n'a pas déjà noté ce livre
		const userRating = book.ratings.find(rating => rating.userId === userId);
		if (userRating) {
			throw new Error('L’utilisateur a déjà noté ce livre.');
		}
		// Ajouter la nouvelle notation au tableau "ratings"
		book.ratings.push({ 
			userId: userId, 
			grade: req.body.rating
		});

		// Recalculer la note moyenne du livre
		const totalRatings = book.ratings.length;
		const sumOfGrades = book.ratings.reduce((acc, cur) => acc + cur.grade, 0);
		book.averageRating = sumOfGrades / totalRatings;

		// Mettre à jour le livre dans la base de données
		console.log(book);
		book.save()
			.then(() => res.status(200).json(book))
			.catch(error => res.status(500).json({ error: error.message }));
		
	})
	.catch(error => res.status(500).json({ error: error.message }));
}

