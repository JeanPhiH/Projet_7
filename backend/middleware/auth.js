const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
  try {
		// on copie le token en enlevant le "bearer" dans l' authorization du headers
		const token = req.headers.authorization.split(' ')[1];

		// on vérifie si le token est le bon
		const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

		const userId = decodedToken.userId;
		req.auth = {
			userId: userId
		};
		next(); // on passe au middleware suivant, pour continuer la requête demandée
  } catch(error) {
      res.status(401).json({ error });
  }
};