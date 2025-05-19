const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/create", (req, res) => {
    let { name, username, password, confirmPassword, image } = req.body;
    console.log("Received form data:", req.body);
    userModel.create({
        name,
        username,
        password,
        confirmPassword,
        image,
    })
    res.redirect('/read');
})

app.get("/read", async (req, res) => {
    let users = await userModel.find();
    res.render("read", {users});
});

app.get("/delete/:id", async (req, res) => {
    let users = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect('/read');
})

app.get("/update/:id", async (req, res) => {
    let users = await userModel.findOne({_id: req.params.id})
    res.render("update", {users});
})

app.post("/edit/:userId", async (req, res) => {
    let {newName} = req.body;
    let user = await userModel.findOneAndUpdate({_id: req.params.userId}, {name: newName}, {new:true  })
    res.redirect('/read');
})

app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
});