const express = require('express');
const auth = require('../middleware/auth');
const booksCtrl = require('../controllers/booksCtrl');
const ratingCtrl = require('../controllers/ratingCtrl');
const router = express.Router();

// BOOK ROUTES
router.post('/', auth, booksCtrl.postBook);
router.put('/:id', auth, booksCtrl.putBook);
router.delete('/:id', auth, booksCtrl.deleteBook);
router.get('/:id', auth, booksCtrl.getOneBook);
router.get('/', auth, booksCtrl.getAllBooks);

// RATING ROUTES
router.post('/:id/rating', auth, ratingCtrl.postRating);
router.put('/:id/rating', auth, ratingCtrl.putRating);
router.get('/bestrating', auth, ratingCtrl.getBestRating);

module.exports = router;