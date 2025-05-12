const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');

app.set('view engine', "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    fs.readdir('./files', function(err, files){
        if (err) return res.send("Error reading files");
        let notes = []
        files.forEach((file) => {
            const content = fs.readFileSync(`./files/${file}`, 'utf-8')
            notes.push({title: file, description: content});
        })
        res.render("index", {files: files});    // rendering files stored in the folder in the index page only..
    })
})

app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}`, req.body.description, function(err){  // path, fileName(title), body, callback for error
        res.redirect('/');
    })
})

app.listen(3000);