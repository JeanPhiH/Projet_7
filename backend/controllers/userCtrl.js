const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//SIGNUP
exports.signup = (req, res, next) => {
	bcrypt.hash(req.body.password, 10) // hashing 10 times
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//LOGIN
exports.login = (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then(user => {
			if (!user) { // on vérifie si l'utilisateur existe
					return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
			}
			bcrypt.compare(req.body.password, user.password)
			// comparing input password with hashed password
				.then(valid => {
					if (!valid) {
						return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
					};
					res.status(200).json({
						userId: user._id,
						token: jwt.sign(
							{ userId: user._id },
							process.env.SECRET_TOKEN,
							{ expiresIn: '24h' }
						)
					}); // sending a token when the user logs in
					})
				.catch(error => res.status(500).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
};