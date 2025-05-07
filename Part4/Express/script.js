const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send("Express JS is working")
})

app.get('/about', function(req, res){
    res.send("Express JS library")
})

app.get('/functionality', function(req, res){
    res.send("It manages everything from receiving the request and giving the response, connecting to databases, etc.")
})



app.listen(3000);