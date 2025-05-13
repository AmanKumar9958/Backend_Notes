const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');

app.set('view engine', "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "public")));


// Route for homepage
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

// This will take the data and create the file..
app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}`, req.body.description, function(err){  // path, fileName(title), body, callback for error
        res.redirect('/');
    })
})

// This will show open the file..
app.get("/file/:filename", function(req, res){
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, fileData){
        res.render("show", {filename: req.params.filename, fileData: fileData})
    })
})

// This will delete the file..
app.get("/deleteFile/:filename", function(req, res){
    fs.unlink(`./files/${req.params.filename}`, function(err){
        if(err){
            console.log("Failed to delete the file: ", err);
            return res.send("Error deleting file");
        }
        res.redirect("/");
    })
})

// This will save the file like file..

app.listen(3000);