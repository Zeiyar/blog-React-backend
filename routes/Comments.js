const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const Joi = require("joi");
const auth = require("../middleware/auth");

const articleSchema = Joi.object({
    articleId: Joi.string().required(),
    content: Joi.string().min(3).max(300).required(),
    rating: Joi.number().min(1).max(5),
})

//creer commentaire
router.post("/",auth,async(req,res)=>{
    const {error} = articleSchema.validate(req.body)
    if (error) return res.status(400).json({message: error.details[0].message});

    const comment = new Comment({
        articleId: req.body.articleId,
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
router.get("/:articleId",async(req,res)=>{
    try{
    const page = parseFloat(req.query.page)||1;
    const limit = parseFloat(req.query.limit)||20;
    const skip = (page-1)*limit;

    const comments = await Comment.find({ articleId: req.params.articleId }).skip(skip).limit(limit).sort({createdAt:-1});

    const total = await Comment.countDocuments();

    res.json({comments,pages : Math.ceil(total/limit,page,limit)});
}
    catch(err){
        res.status(500).json({message:err.message});
    }
});

//supprimer

router.delete("/:articleId/:commentId",auth,async(req,res)=>{
    try{
        const comment = await Comment.findbyId(req.params.commentId);
        if (!comment) return res.status(400).json({message : "comment not found"});
        
        if (comment.username !== req.user.username || req.user.username !== "ADMIN"){
            return res.status(403).json({ message: "Not authorized" });
        }
        await comment.deleteOne();
        res.json({message : "Comment deleted successfully"});
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
})

module.exports = router;