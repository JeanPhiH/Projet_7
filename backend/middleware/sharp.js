const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res, next) => {
	// Check if an image file has been uploaded
	if (!req.file) {
		return next()
	};
	const filePath = req.file.path;
	const { name: resizedName } = path.parse(filePath);
	req.file.resizedFileName = `${resizedName}-rs.webp`;
	// add '-rs' to handle webp images deletion

	await sharp(filePath).resize({height: 500}).webp({ quality: 80 }).toFile("images/" + req.file.resizedFileName)
	.catch((error) => console.log(error));

	fs.unlink(filePath, (error) => {
		if(error) console.log(error);
	});
	next();
}
