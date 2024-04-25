const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sharp = require('../middleware/sharp');
const booksCtrl = require('../controllers/booksCtrl');
const ratingCtrl = require('../controllers/ratingCtrl');
const router = express.Router();

// BOOK ROUTES
router.post('/', auth, multer, sharp, booksCtrl.postBook);
router.put('/:id', auth, multer, sharp, booksCtrl.putBook);
router.delete('/:id', auth, booksCtrl.deleteBook);
router.get('/:id', booksCtrl.getOneBook);
router.get('/', booksCtrl.getAllBooks);

// RATING ROUTES
router.post('/:id/rating', auth, ratingCtrl.postRating);
router.get('/bestrating', ratingCtrl.getBestRating);

module.exports = router;