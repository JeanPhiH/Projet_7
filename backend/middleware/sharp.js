const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res, next) => {
	const filePath = req.file.path;
	const { name: resizedName } = path.parse(filePath);
	req.file.resizedFileName = `${resizedName}.webp`;

	await sharp(filePath).resize({height: 300}).webp({ quality: 75 }).toFile("images/" + req.file.resizedFileName)
	.catch((error) => console.log(error));

	fs.unlink(filePath, (error) => {
		if(error) console.log(error);
	});
	next();
}
