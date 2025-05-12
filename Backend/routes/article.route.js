import express from "express";
import {
  createArticle,
  deleteArticle,
  getArticles,
  updateArticle,
} from "../controllers/article.controller.js";

const router = express.Router();

router.get("/", getArticles);

router.post("/", createArticle);

router.put("/:id", updateArticle);

router.delete("/:id", deleteArticle);

export default router;
