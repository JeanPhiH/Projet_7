const Book = require('../models/book');
const fs = require('fs');


//POST
exports.postBook = (req, res, next) => {
	const bookObject = JSON.parse(req.body.book);
	// must parse the request because the image is sent as a string
  delete bookObject._id;
	delete bookObject._userId;
	// delete the false id used by frontend
  const book = new Book({
		...bookObject,
		userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.resizedFileName}`,
		ratings: [{
			userId: req.auth.userId,
			grade: bookObject.ratings[0].grade
		}],
  });
  book.save() // saving in the database
    .then(() => res.status(201).json({ message: 'New book registered !'}))
    .catch(error => {
			const filename = book.imageUrl.split('/images/')[1];
			fs.unlink(`images/${filename}`, (error) => {
				if(error) console.log(error);
			});
			res.status(400).json({ error });
		});
		// same as: .json({error: error})
}

//PUT
exports.putBook = (req, res, next) => {
	const bookObject = req.file ? {
		...JSON.parse(req.body.book), // parsing for the image
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.resizedFileName}`
	} : { ...req.body };
	
	delete bookObject._userId;
	Book.findOne({_id: req.params.id})
	.then((book) => {
			if (book.userId != req.auth.userId) {
				res.status(403).json({ message : 'Not authorized'});
			} else {
				if (req.file) {
					// delete the previous image if a new file is uploaded
					const filename = book.imageUrl.split('/images/')[1];
					fs.unlink(`images/${filename}`, (error) => {
						if(error) console.log(error);
					});
				}
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
				// get the filename to delete it
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

