const express = require('express');
const path = require('path');
const app = express();

// these lines are parser for form
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

// setting up view engine for ejs..
app.set('view engine', 'ejs');

// setting up public static files..
app.use(express.static(path.join(__dirname, 'public')))

// rendering ejs
app.get('/', (req, res) => {
    res.render("index")
})

app.get('/about', (req, res) => {
    res.render("about")
})

app.listen(3000);