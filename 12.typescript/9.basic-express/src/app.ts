// const express = require("express");
// 이거 X, import 로

import express from "express";
import { Application, Request, Response, NextFunction } from "express";
// @types/express에 정의되어 있음
import morgan from "morgan";

const app: Application = express();
const port: number = 3000;

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello, TypeScript");
});

app.get("/error", (req: Request, res: Response): void => {
  throw new Error("그냥 오류...");
});

// 404 핸들용 미들웨어
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Page Not Found",
  });
});

// 에러 처리용 미들웨어
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[에러]: ${err.message}`);
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

app.listen(port, (): void => {
  console.log("서버 레디");
});
