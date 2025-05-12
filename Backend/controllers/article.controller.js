import Article from "../models/article.model.js";
import mongoose from "mongoose";

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.status(200).json({ success: true, data: articles });
  } catch (error) {
    console.error("Error fetching articles:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createArticle = async (req, res) => {
  const { title, description, image } = req.body; // Extract fields

  if (!title || !description || !image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the required fields",
    });
  }

  try {
    const newArticle = new Article({
      title,
      description,
      image,
    });
    await newArticle.save();
    res.status(201).json({ success: true, data: newArticle });
  } catch (error) {
    console.error("Error creating article:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const article = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }

  try {
    const updatedArticle = await Article.findByIdAndUpdate(id, article, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedArticle });
  } catch (error) {
    console.error("Error updating article:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }

  try {
    // Check if the article exists
    const article = await Article.findById(id);
    if (!article) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }

    // Attempt to delete the article
    await Article.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Article deleted" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
