const express = require('express');
const app = express();

const userModel = require('./models/user');
const postModel = require('./models/posts');

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get("/create", async(req, res) => {
    let newUser = await userModel.create({
        username: "AmanWebDev24",
        email: "amancollege04@gmail.com",
        age: 20
    })
    res.send(newUser);
})

app.get("/post/create", async(req, res) => {
    let newPost = await postModel.create({
        postData: "I am from IITM, Janakpuri",
        user: "683cf5d58ac92a62357d6974"    // copied from the database (manually)..
    })

    let user = await userModel.findOne({_id: "683cf5d58ac92a62357d6974"});   // finding the user using ID..
    user.posts.push(newPost.id);    // adding the post id into user schema..
    await user.save();

    res.send({newPost, user});
})

app.get("/posts", async(req, res) => {
    let user = await userModel.findOne({_id: "683cf5d58ac92a62357d6974"}).populate("posts", "postData date");
    if(!user){
        return res.send("No user found!!");
    }
    res.send(user.posts);
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});