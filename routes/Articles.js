const express = require('express');
const router = express.Router();
const Articles = require('../models/Article');
const auth = require("../middleware/auth");
// GET tous les articles
router.get('/', async (req, res) => {
    try {
        const articles = await Articles.find();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET un seul article par ID
router.get('/:id', async (req, res) => {
    console.log("l article reçu dans body :", req.body)
    try {
        const article = await Articles.findById(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article non trouvé' });
        res.json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST créer un article
router.post('/',auth, async (req, res) => {
    const article = new Articles({
        title: req.body.title,
        content: req.body.content,
        author: req.user.username || req.user.email || req.user.id,
    });

    try {
        const newArticle = await article.save();
        res.status(201).json(newArticle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT modifier un article
router.put('/:id',auth, async (req, res) => {
    try {
        const updatedArticle = await Articles.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedArticle) return res.status(404).json({ message: 'Article non trouvé' });
        res.json(updatedArticle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE supprimer un article
router.delete('/:id',auth, async (req, res) => {
    try {
        const deletedArticle = await Articles.findByIdAndDelete(req.params.id);
        if (!deletedArticle) return res.status(404).json({ message: 'Article non trouvé' });
        res.json({ message: 'Article supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
