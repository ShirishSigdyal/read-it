import express, { Express } from "express";

import cookieParser from "cookie-parser";

import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Listening to the server on port ${port}`);
});
