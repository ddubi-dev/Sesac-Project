// (런타임) 운영할 때만 필요함 - npm i express
// 개발시 필요함 -  npm i -D @types/express, npm i -D @types/morgan

import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import { getRandomQuote } from "./quote";

const app: Application = express();
const PORT: number = 3000;

app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/api/quote", (req: Request, res: Response) => {
  res.json({ quote: getRandomQuote() });
});

app.listen(PORT, () => {
  console.log("서버 레디");
});

// ts-node src/server.ts
// http://localhost:3000/api/quote
