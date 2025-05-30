const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        unique: true,
        required: true
    },
    // visitHistory is an array of objects
    visitHistory: [{timestamp: {type: Number}}],

}, {timestamps: true});

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;