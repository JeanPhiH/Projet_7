const express = require('express');
const mongoose = require('mongoose');

const app = express();

//JSON
app.use(express.json());

//DATABASE CONNEXION
mongoose.connect('mongodb+srv://p7jeanphi:mdpp7jeanphi@p7mvg.3ig75s2.mongodb.net/?retryWrites=true&w=majority&appName=P7MVG',
	{ useNewUrlParser: true,
		useUnifiedTopology: true })
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch(() => console.log('Connexion à MongoDB échouée !'));

//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//SHORTCUTS
app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;