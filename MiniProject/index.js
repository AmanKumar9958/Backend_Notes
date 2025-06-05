const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
app.get('/', async(req, res) => {
    // Check if the user is authenticated by verifying the JWT token..
    let token = req.cookies.token;
    if(!token){
        return res.redirect('/login');
    }

    try {
        let decoded = jwt.verify(token, "secretKey");
        let user = await userModel.findById(decoded.userid);
        if(!user){
            return res.redirect('/login');
        }
        // Check if token cookie exists
        const isLoggedIn = req.cookies.token ? true : false;
        // Fetch all posts from the database..
        const posts = await postModel.find().populate('user', 'username').sort({ createdAt: -1 });
        res.render('home', {user, posts, isLoggedIn });
    } catch (err) {
        console.error(err);
        res.redirect('/login');
    }
});

// login page route..
app.get('/login', (req, res) => {
    res.render('login');
});

// Register page route..
app.get('/register', async(req, res) => {
    res.render("register")
});

// our register route..
app.post('/register', async(req, res) => {
    // Check if the request body has all required fields..
    let { username, email, password, age } = req.body;
    if(!username || !email || !password || !age){
        return res.redirect('/register?error=user_exists');
    }

    // Check if user already exists..
    let user = await userModel.findOne({ $or: [{email}, {username}] });
    if(user){
        return res.redirect('/register?error=user_exists');
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

            // Generate a JWT token for the user..
            let token = jwt.sign({email: user.email, userid: user._id}, "secretKey");

            // Send the token as a cookie in the response..
            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // Set to true if using HTTPS
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });
            res.redirect("/login");
        })
    })
})

// our login route..
app.post('/login', async(req, res) => {
    // Check if the request body has all required fields..
    let { username, password } = req.body;
    if (!username || !password) {
        return res.redirect('/login?error=true');
    }

    // Check if the user exists in the database..
    let user = await userModel.findOne({ username });
    if (!user) {
        return res.redirect('/login?error=true');
    }

    // Compare the provided password with the hashed password in the database..
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: user.email, userid: user._id }, "secretKey");
            // Send the token as a cookie in the response..
            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // Set to true if using HTTPS
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });
            res.redirect('/profile');
        } else {
            return res.redirect('/login?error=true');
        }
    });
});

// our logout route..
app.get('/logout', (req, res) => {
    // Clear the token cookie to log out the user..
    res.clearCookie('token');
    res.redirect('/login');
});

// Checking for protected routes..
function isLoggedIn(req, res, next){
    const token = req.cookies.token;
    if(!token){
        return res.redirect('/login');
    }
    try{
        const data = jwt.verify(token, "secretKey");
        req.user = data;
        next();
    } catch(err){
        console.error(err);
        return res.redirect('/login');
    }
}

// Our profile page route..
app.get('/profile', isLoggedIn, async(req, res) => {
    // Fetch the user data from the database using the user ID from the JWT token..
    let user = await userModel.findById(req.user.userid);
    if(!user){
        return res.redirect('/login');
    }
    // Fetch only posts created by the logged-in user
    const posts = await postModel.find({ user: user._id }).populate('user', 'username').sort({ createdAt: -1 });
    res.render('profile', { user, posts });
});

// All Posts page route..
app.get('/posts', isLoggedIn, async(req, res) => {
    // Fetch all posts from the database..
    const posts = await postModel.find().populate('user', 'username').sort({ createdAt: -1 });
    const user = await userModel.findById(req.user.userid);
    res.render('posts', { posts, user });
});

// Create Post route..
app.post('/create-post', isLoggedIn, async(req, res) => {
    let { title, content } = req.body;
    let user = await userModel.findOne({email: req.user.email});
    let post = await postModel.create({
        user: user._id,
        title,
        content
    })
    user.posts.push(post._id);
    await user.save();
    res.redirect('/posts')
})


// Our port..
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});