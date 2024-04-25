const Book = require('../models/book');
const fs = require('fs');
const path = require('path');


//POST
exports.postBook = (req, res, next) => {
	const reqFileName = req.file.filename;
	const { name: noExtFileName } = path.parse(reqFileName);
	const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
	delete bookObject._userId; 
	// on supprime le faux id utilisé par le frontend
  const book = new Book({
		...bookObject,
		userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${noExtFileName}.webp`,
		ratings: [{
			userId: req.auth.userId,
			grade: bookObject.ratings[0].grade
		}],
  });
  book.save() // on sauvegarde dans la DB
    .then(() => res.status(201).json({ message: 'New book registered !'}))
    .catch(error => res.status(400).json({ error }));
		// pareil que: .json({error: error})
}

//PUT
exports.putBook = (req, res, next) => {
	const reqFileName = req.file.filename;
	const { name: noExtFileName } = path.parse(reqFileName);
	const bookObject = req.file ? {
		...JSON.parse(req.body.book),
		imageUrl: `${req.protocol}://${req.get('host')}/images/${noExtFileName}.webp`
	} : { ...req.body };

	delete bookObject._userId;
	Book.findOne({_id: req.params.id})
		.then((book) => {
			if (book.userId != req.auth.userId) {
				res.status(401).json({ message : 'Not authorized'});
			} else {
				Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
				.then(() => res.status(200).json({message : 'Book modified !'}))
				.catch(error => res.status(401).json({ error }));
			}
		})
		.catch((error) => {
			res.status(400).json({ error });
		});
}

//DELETE
exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id})
		.then(book => {
			if (book.userId != req.auth.userId) {
				res.status(401).json({message: 'Not authorized'});
			} else {
				const filename = book.imageUrl.split('/images/')[1];
				//on isole le nom du fichier et on supprime l'image
				fs.unlink(`images/${filename}`, () => {
					Book.deleteOne({_id: req.params.id})
						.then(() => { res.status(200).json({message: 'Book deleted !'})})
						.catch(error => res.status(401).json({ error }));
				});
			}
		})
		.catch( error => {
			res.status(500).json({ error });
		});
};

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

