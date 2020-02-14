const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { User } = require('../models/User')


// get all posts
router.get('/', async(req, res) => {
   try {
       const posts = await Post.find();
       res.json(posts)
   } catch (error) {
       res.json({message:err})
   }
});
// submit a post
router.post('/', async(req, res)=>{
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    })
    try{
        const newPosts = await post.save()
        res.status(201).json(newPosts)
    }catch(err){
        res.status(400).json({message:err})
    }
})
// specific Post
router.get('/:postId', async(req, res) =>{
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({message: err})
    }
})
// update
router.patch('/:postId', async(req, res)=>{
    try {
       const updatedPost = await Post.updateOne(
            {_id: req.params.postId},
            { $set: {title:req.body.title}});
            res.json(updatedPost);
    } catch (error) {
        res.json({message:error})
    }
})
// delete a post
router.delete('/:postId', async(req, res)=>{
    try {
       const removedPost = await Post.remove({ _id: req.params.postId })
       res.json(removedPost);
    } catch (error) {
        res.json({message:error})
    }
})
module.exports = router;