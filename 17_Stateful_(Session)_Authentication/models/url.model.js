const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitHistory: [{}, {timestamps: true}], // Array of objects to store visit history
    // Created to track the original creator of the URL
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true});

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;