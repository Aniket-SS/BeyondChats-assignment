const express = require("express");
const Article = require("../models/Article");
const router = express.Router();

// CREATE article
router.post("/", async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: "Failed to create article" });
  }
});

// READ all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: 1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

// READ single article
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(400).json({ error: "Invalid article ID" });
  }
});

// UPDATE article
router.put("/:id", async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: "Failed to update article" });
  }
});

// DELETE article
router.delete("/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete article" });
  }
});

module.exports = router;
