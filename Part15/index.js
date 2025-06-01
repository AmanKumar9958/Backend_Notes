const express = require("express");
const app = express();
const userModel = require("./models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cookieParser= require('cookie-parser')
const path = require("path");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// route to show the create user form..
app.get('/', (req, res) => {
    res.render("index");
})

// route to handle the create user form submission..
app.post('/create', async(req, res) => {
    let {username, email, password, age} = req.body;

    // hashing the password..
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async(err, hash) => {
            let createdUser = await userModel.create({
                username,
                email,
                password: hash,
                age
            })
            // generating the token..
            let token = jwt.sign({email}, "aman",);
            
            // sending cookie to the browser..
            res.cookie("token", token);

            // sending the response..            
            res.send(createdUser);
        })
    })
})

// route for user log out..
app.get('/logout', (req, res) => {
    res.cookie("token", "");
    res.redirect('/');
})

// route to show the login form..
app.get('/login', (req, res) => {
    res.render("login");
})

// route to handle the login form submission..
app.post('/login', async(req, res) => {
    let user = await userModel.findOne({email: req.body.email});
    if(!user) {
        return res.send("Something went wrong. Please try again later.");
    }
    // comparing the password..
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if(err) {
            console.error("Bcrypt compare error:", err);
            return res.send("something went wrong. Please try again later.");
        }
        if(result){
            // generating the token..
            let token = jwt.sign({email: user.email}, "aman");
            res.cookie("token", token);
            res.send("Login successful");
        } else {
            res.send("Something went wrong. Please try again later.");
        }
    })
})

app.listen(3000);