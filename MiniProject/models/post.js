const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/miniProject');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0,
        ref: 'User'
    },
});


module.exports = mongoose.model('Post', postSchema);