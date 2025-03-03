import { Request, Response, NextFunction } from "express";
import {
  getArticlesFromDb,
  createArticleInDb,
  updateArticleInDb,
  deleteArticleInDb,
} from "../services/articleService";

import redisClient from "../config/redis";

const ARTICLES_CACHE_KEY = "articles";

//Get all articles
export const getArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cachedArticles = await redisClient.get(ARTICLES_CACHE_KEY);

    if (cachedArticles) {
      try {
        const parsedArticles = JSON.parse(cachedArticles);
        res.json(parsedArticles);
      } catch (jsonError) {
        await redisClient.del(ARTICLES_CACHE_KEY);
      }
    }

    const articles = await getArticlesFromDb();
    await redisClient.set(ARTICLES_CACHE_KEY, JSON.stringify(articles), {
      EX: 60,
    });
    res.json(articles);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//Create article
export const createArticle = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const newArticle = await createArticleInDb(req.body, req.user);
      await redisClient.del(ARTICLES_CACHE_KEY);
      res.status(201).json(newArticle);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//Update article
export const updateArticle = async (req: Request, res: Response) => {
  try {
    const updatedArticle = await updateArticleInDb(req.params.id, req.body);
    await redisClient.del(ARTICLES_CACHE_KEY);
    res.status(200).json(updatedArticle);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//Delete article
export const deleteArticle = async (req: Request, res: Response) => {
  try {
    await deleteArticleInDb(req.params.id);
    await redisClient.del(ARTICLES_CACHE_KEY);
    res.status(200).json({ message: "Successfully deleted article" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
