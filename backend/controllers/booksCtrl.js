const Book = require('../models/book');

//POST
exports.postBook = (req, res, next) => {
  delete req.body._id; // on supprime le faux id utilisé par le frontend
  const book = new Book({
    ...req.body // on copie le schéma de données
		// same as:
		// title: req.body.title,
    // description: req.body.description,
    // imageUrl: req.body.imageUrl,
    // price: req.body.price,
    // userId: req.body.userId
  });
  book.save() // on sauvegarde dans la DB
    .then(() => res.status(201).json({ message: 'New book registered !'}))
    .catch(error => res.status(400).json({ error }));
		// pareil que: .json({error: error})
}

//PUT
exports.putBook = (req, res, next) => {
	Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(() => res.status(200).json({ message: 'Book modified !'}))
		.catch(error => res.status(400).json({ error }));
}

//DELETE
exports.deleteBook = (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Book deleted !'}))
    .catch(error => res.status(400).json({ error }));
}

//GET ONE
exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
}

//GET ALL
exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
}