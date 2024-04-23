const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const booksCtrl = require('../controllers/booksCtrl');
const ratingCtrl = require('../controllers/ratingCtrl');
const router = express.Router();

// BOOK ROUTES
router.post('/', auth, multer, booksCtrl.postBook);
router.put('/:id', auth, multer, booksCtrl.putBook);
router.delete('/:id', auth, booksCtrl.deleteBook);
router.get('/:id', auth, booksCtrl.getOneBook);
router.get('/', auth, booksCtrl.getAllBooks);

// RATING ROUTES
router.post('/:id/rating', auth, ratingCtrl.postRating);
router.get('/bestrating', auth, ratingCtrl.getBestRating);

module.exports = router;