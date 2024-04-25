const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res, next) => {
	const filePath = req.file.path;
	const { name: resizedName } = path.parse(filePath);
	const resizedFilePath = `images/${resizedName}.webp`;
	await sharp(filePath).resize({height: 200}).webp({ quality: 75 }).toFile(resizedFilePath)
	.catch((error) => console.log(error));

	fs.unlink(filePath, (error) => {
		if(error) console.log(error);
	});
	next();
}
