const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
	email: { type: String, validate: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Invalid email'],required: true, unique: true },
	password: { type: String, required: true },
	// _id: from mongodb
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)