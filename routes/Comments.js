const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const Joi = require("joi");
const auth = require("../middleware/auth");

const articleSchema = Joi.object({
    content: Joi.string().min(3).max(300).required,
    rating: Joi.number().min(1).max(5),
})

//creer commentaire
router.post("/comments",auth,async(req,res)=>{
    const {error} = articleSchema.validate(req.body)
    if (error) return res.status(400).json({message: error.details[0].message});

    const comment = new Comment({
        username: req.user.username,
        rating: req.body.rating,
        content: req.body.content,
    });

    try{
        const newComment = await comment.save();
        res.status(201).json(newComment);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
//recuperer commentaires par articles

router.get("/comments/:articleId",async(req,res)=>{
    const comments = await Comment.find({ articleId: req.params.articleId });
    res.json(comments);
});