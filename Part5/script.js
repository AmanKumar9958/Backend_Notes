const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send("I am Express JS")
})


app.listen(3000);