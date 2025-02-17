import express, { Express } from "express";

import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.listen(port, () => {
  console.log(`Listening to the server on port ${port}`);
});
