const express = require('express')
const app = express()

// creating middlewares..
app.use(function(req, res, next){
    console.log("I am a middleware")    // this will run before going to any route..
    next();                             // this will helps to move to the next work (whether it is route or anything)..
})

app.use(function(req, res, next){
    console.log(2+2)
    next();
})

// routes..
app.get('/', function(req, res){
    res.send("Middleware is working fine")
})

app.get('/about', function(req, res){
    res.send("This page is about Middleware")
})

app.get('/profile', function(req, res, next){
    return next(new Error("Not implemented yet!!"))     // this print in the console
})

// error handling..
app.use((error, req, res, next) => {
    console.error(error.stack)
    res.status(500).send('Something went wrong!!')      // this print in the frontend..
})

app.listen(3000)