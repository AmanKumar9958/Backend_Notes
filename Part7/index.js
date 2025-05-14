const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');
const { title } = require("process");

app.set('view engine', "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "public")));


// Route for homepage and showing all notes..
app.get('/', (req, res) => {
    fs.readdir('./files', function(err, files){
        if (err) return res.send("Error reading files");
        let notes = []
        files.forEach((file) => {
            const content = fs.readFileSync(`./files/${file}`, 'utf-8')
            notes.push({title: file, description: content});
        })
        res.render("index", {files: notes});    // rendering files stored in the folder in the index page only..
    })
})

// Create File..
app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}`, req.body.description, function(err){  // path, fileName(title), body, callback for error
        res.redirect('/');
    })
})

// View File..
app.get("/file/:filename", function(req, res){
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, fileData){
        res.render("show", {filename: req.params.filename, fileData: fileData})
    })
})

// Delete File..
app.get("/deleteFile/:filename", function(req, res){
    fs.unlink(`./files/${req.params.filename}`, function(err){
        if(err){
            console.log("Failed to delete the file: ", err);
            return res.send("Error deleting file");
        }
        res.redirect("/");
    })
})

// Saving favorite File..
app.get('/savedFile/:filename', (req, res) => {
    const sourcePath = path.join(__dirname, "files", req.params.filename);
    const destPath = path.join(__dirname, "savedFiles", req.params.filename);

    // checking if file available..
    fs.access(sourcePath, fs.constants.F_OK, (err) => {
        if(err){
            res.send("File NOT Found");
        }
        // copy the file..
        fs.copyFile(sourcePath, destPath, (err) => {
            if(err){
                console.error("Error copying file: ", err);
                return res.send("Error saving the file to Favorite..");
            }
            res.redirect("/savedFiles");
        })
    })
})

// Showing all favorite files..
app.get("/savedFiles", function(req, res){
    fs.readdir('./savedFiles', function(err, files){
        if(err) return res.send("Error reading files");
        let notes = []
        files.forEach((file) => {
            const content = fs.readFileSync(`./savedFiles/${file}`, "utf-8")
            notes.push({title: file, description: content});
        })
        res.render("saved", {savedFiles: notes})
    })
})

// Delete saved File..
app.get("/deleteSavedFile/:filename", function(req, res){
    fs.unlink(`./savedFiles/${req.params.filename}`, function(err){
        if(err){
            console.log("Failed to delete the file: ", err);
            return res.send("Error deleting file");
        }
        res.redirect("/savedFiles");
    })
})

// View saved files..
app.get('/savedFiles/:filename', function(req, res){
    fs.readFile(`./savedFiles/${req.params.filename}`, "utf-8", function(err, fileData){
        res.render("showSavedFiles", {filename: req.params.filename, fileData: fileData})
    })
})

// Edit File name..
app.get('/edit/:filename', function(req, res){
    res.render("edit", {filename: req.params.filename})
})

app.post('/edit', function(req, res){
    fs.rename(`./files/${req.body.prevName}`, `./files/${req.body.newName}`, function(err){
        res.redirect('/');
    });
})

app.listen(3000);