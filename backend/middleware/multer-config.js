const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
	// la destination sera le dossier images
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
	// on remplace les espaces par un underscore, on y ajoute la date et l'extension pour avoir un nom de fichier unique et valide
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');