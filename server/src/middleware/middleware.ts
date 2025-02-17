import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AuthError from "../errors/authError";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      email: string;
      username: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
