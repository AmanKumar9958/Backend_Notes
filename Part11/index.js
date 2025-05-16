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

app.get("/", (req, res) => {
    res.send("Hey, Aman")
})

app.get("/", (req, res) => {
    res.send("Hey, Aman")
})

app.listen(4000);