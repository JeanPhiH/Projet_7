const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
  try {
		// copying the token without the "headers" part
		const token = req.headers.authorization.split(' ')[1];

		// checking if the token is valid
		const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

		// getting the userId from the token
		const userId = decodedToken.userId;
		req.auth = {
			userId: userId
		};
		next(); // going to the next middleware
  } catch(error) {
      res.status(401).json({ error });
  }
};