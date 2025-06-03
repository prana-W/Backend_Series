const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'NORMAL',
        enum: ['NORMAL', 'ADMIN'] // Only these roles are allowed to be selected for any user
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;