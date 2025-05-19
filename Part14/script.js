const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')

// for reading cookie..
app.use(cookieParser());

app.get("/", (req, res) => {
    // res.send("Hey Developer");

    // setting up cookie:
    res.cookie("name", "Aman");
    res.send("Cookie set successfully!!");
})

app.get('/readCookie', (req, res) => {
    // reading cookie..
    console.log(req.cookies);
    res.send("Cookie logged in the console!!")
})


app.listen(4000);