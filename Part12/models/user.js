const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Part12");

const userScheme = mongoose.Schema({
    name: "String",
    username: "String",
    password: "String",
    confirmPassword: "String",
})

module.exports = mongoose.model('user', userScheme);    //(Schema name, schema to be created)