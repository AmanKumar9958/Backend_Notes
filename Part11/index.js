const express = require('express');
const app = express();
const userModel = require('./userModel');

app.get("/", (req, res) => {
    res.send("Hey, Aman")
})

app.get("/create", async (req, res) => {
    let createdUser = await userModel.create({
        name: "Aman Kumar",
        age: 20,
        email: "amancollege04@gmail.com"
    })

    res.send(createdUser);
})

app.get("/update", async (req, res) => {
    let updatedUser = await userModel.findOneAndUpdate({name: "Aman Kumar"}, {name: "Gopal", age: 19}, {new: true});   // find, update, return..
    res.send(updatedUser);
})

app.get("/read", async (req, res) => {
    let users = await userModel.find();
    res.send(users);
})

app.get("/delete", async (req, res) => {
    let user = await userModel.deleteMany({name: "Gopal"})
    res.send(user);
})

app.listen(4000);