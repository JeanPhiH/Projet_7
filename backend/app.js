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





// app.post('/api/auth/signup', (req, res, next) => {
//   console.log(req.body); // possible grâce au middleware du dessus
//   res.status(201).json({
//     message: 'Signed up !'
//   });
// });

// app.post('/api/auth/login', (req, res, next) => {
//   console.log(req.body); // possible grâce au middleware du dessus
//   res.status(201).json({
//     message: 'Logged in !'
//   });
// });

// app.post('/api/books', (req, res, next) => {
//   console.log(req.body); // possible grâce au middleware du dessus
//   res.status(201).json({
//     message: 'Book added !'
//   });
// });

// app.post('/api/books/:id/rating', (req, res, next) => {
//   console.log(req.body); // possible grâce au middleware du dessus
//   res.status(201).json({
//     message: 'Book rated !'
//   });
// });

// app.put('/api/books/:id/rating', (req, res, next) => {
//   console.log(req.body); // possible grâce au middleware du dessus
//   res.status(201).json({
//     message: 'Book rerated !'
//   });
// });



// app.get('/api/books', (req, res, next) => {
//   const books = [
//     {
//       _id: '001',
//       title: 'Book 1',
//     },
//     {
//       _id: '002',
//       title: 'Book 2',
//     },
//   ];
//   res.status(200).json(books);
// 	next();
// });

// app.get('/api/books/:id', (req, res, next) => {
  
//   res.status(200).json(books[id]);
// 	next();
// });

// app.get('/api/books/bestrating', (req, res, next) => {
  
//   res.status(200).json(ratings);
// 	next();
// });

// app.delete('/api/books/:id', (req, res, next) => {
  
//   res.status(200).json(ratings);
// 	next();
// });

// app.use((req, res, next) => {
//   console.log('Réponse envoyée avec succès !');
// });

module.exports = app;