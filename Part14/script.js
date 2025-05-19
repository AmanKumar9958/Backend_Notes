const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

// for reading cookie..
app.use(cookieParser());


// setting up cookie:
app.get("/", (req, res) => {
    // res.send("Hey Developer");
    res.cookie("name", "Aman");
    res.send("Cookie set successfully!!");
})

// reading cookie..
app.get('/readCookie', (req, res) => {
    console.log(req.cookies);
    res.send("Cookie logged in the console!!")
})

// password encryption..
app.get('/passEncrypt', (req, res) => {
    let originalPass = "amancollege@2023";
    bcrypt.genSalt(10, (err, salt) => { // 10-> No. of rounds
        bcrypt.hash(originalPass, salt, (err, hash) => {  // original pass, number of rounds to encrypt
            console.log("Encrypted Password: ", hash);
        })
    })
    res.send("Password encrypted, go to the console..")
})

// password decryption.. 
app.get("/passDecrypt", (req, res) => {
    bcrypt.compare("amancollege@2023", "$2b$10$qe8Od7CC7aecStClBNxESOvMC/3Yc8hlcvk.t7n5FPy90xNiB0lbm", function(err, result){   // originalPass, EncryptedPass
        console.log(result);
    })
})


app.listen(4000);