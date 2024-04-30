const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sharp = require('../middleware/sharp');
const booksCtrl = require('../controllers/booksCtrl');
const ratingCtrl = require('../controllers/ratingCtrl');
const router = express.Router();

// RATING ROUTES
router.get('/bestrating', ratingCtrl.getBestRating);
router.post('/:id/rating', auth, ratingCtrl.postRating);

// BOOK ROUTES
router.post('/', auth, multer, sharp, booksCtrl.postBook);
router.put('/:id', auth, multer, sharp, booksCtrl.putBook);
router.delete('/:id', auth, booksCtrl.deleteBook);
router.get('/', booksCtrl.getAllBooks);
router.get('/:id', booksCtrl.getOneBook);


module.exports = router;