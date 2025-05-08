const express = require('express');
const app = express();

// this line is used to make our data readable from the frontend
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.send("I am Express JS")
})


app.listen(3000);