const express = require('express');
const auth = require('../middleware/auth');
const booksCtrl = require('../controllers/booksCtrl');
const router = express.Router();

router.post('/', auth, booksCtrl.postBook);
router.put('/:id', auth, booksCtrl.putBook);
router.delete('/:id', auth, booksCtrl.deleteBook);
router.get('/:id', auth, booksCtrl.getOneBook);
router.get('/', auth, booksCtrl.getAllBooks);


module.exports = router;