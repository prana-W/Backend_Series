const mongoose = require('mongoose');

// Defining user schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
    },
    job_title: {
        type: String,
    }
}, {timestamps: true}) //timestamps will add createdAt and updatedAt fields automatically

// Creating User model
const User = mongoose.model('User', userSchema)
// users collection will be created automatically in MongoDB

module.exports = User;