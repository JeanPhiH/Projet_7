const multer = require('multer');
const path = require('path');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
	'image/webp': 'webp'
};

const storage = multer.diskStorage({
	// destination will be the "images" folder
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
	// replacing spaces by underscores, adding the date and the extension to have a unique and valid filename
  filename: (req, file, callback) => {
		const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
		const { name: noExtName } = path.parse(name);
		const filename = noExtName + Date.now() + '.' + extension;
		console.log("multer: " + filename);
		callback(null, filename);
	}
});

module.exports = multer({storage: storage}).single('image');