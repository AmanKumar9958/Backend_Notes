const express = require('express');
const app = express();
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');
const path = require('path');
const bcrypt = require('bcrypt');

// to render pages using EJS..
app.set('view engine', 'ejs');

// for parsing JSON and URL-encoded data (like form submissions)..
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for setting up cookies..
app.use(cookieParser());

// for serving static files like CSS, JS, images, etc.
app.use(express.static(path.join(__dirname, 'public')));

// our home route..
app.get('/', (req, res) => {
    res.render('index');
});

// our register route..
app.post('/register', async(req, res) => {
    // Check if the request body has all required fields..
    let { username, email, password, age } = req.body;
    if(!username || !email || !password || !age){
        return res.status(400).send('All fields are required');
    }

    // Check if user already exists..
    let user = await userModel.fineOne({email});
    if(user){
        return res.status(400).send('User already exists');
    }

    // Hash the password before saving it to the database..
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async(err, hash) => {
            if(err) {
                return res.status(500).send('Error hashing password');
            }

            // Create a new user instance..
            let user = await userModel.create({
                username,
                email,
                password: hash,
                age
            });
        })
    })



})


// Our port..
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});