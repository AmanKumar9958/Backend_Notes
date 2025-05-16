const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mongoDBPractice');

// Database columns..
const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    email: String
})

module.exports = mongoose.model("user", userSchema);     // user -> Schema name, userSchema -> how will it be created