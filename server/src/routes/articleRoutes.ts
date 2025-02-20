import { Router } from "express";

import { authenticate } from "../middleware/middleware";

import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController";

const router = Router();

router.get("/articles", getArticles);
router.post("/", authenticate, createArticle);
router.put("/:id", authenticate, updateArticle);
router.delete("/:id", authenticate, deleteArticle);

export default router;
