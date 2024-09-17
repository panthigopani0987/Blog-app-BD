const express = require("express");

const Post = require("../models/Post");

const routes = express.Router();

//get post 
routes.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//create posts
routes.post('/', async (req, res) => {
    const { title, content } = req.body;

    try {
        const newPost = new Post({ title, content });
        await newPost.save();
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//get single post
routes.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//update post
routes.put('/:id', async (req, res) => {
    try {
        const update = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//delete post
routes.delete('/:id',async(req,res)=>{
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({message : "Post Deleted"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


module.exports = routes;