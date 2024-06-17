const express = require('express');
const mongoose = require('mongoose');
const booksRoutes = require('./routes/booksRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

require('dotenv').config();


const app = express();

//DATABASE CONNEXION
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));
	
//JSON
app.use(express.json());

//SECURITY
app.use(helmet({
	crossOriginResourcePolicy: false
}));

//RATE LIMIT
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	limit: 300, // Limit each IP to 300 requests per `window` (here, per 5 minutes)
	message: 'Too many requests from this IP, please try again after 5 minutes'
});

app.use(limiter); // Apply the rate limiting middleware to all requests.

//CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://projet-7-frontend-eight.vercel.app');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });
const cors = require('cors');
app.use(cors());

//SHORTCUTS
app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;