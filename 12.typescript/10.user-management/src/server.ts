import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes";

const app: Application = express();
const port: number = 3000;

// 각종 미들웨어
app.use(express.json());
app.use(morgan("dev"));

// 사용자 라우트 등록
app.use("/users", userRoutes);

//404 에러 처리 미들웨어
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Page Not Found" });
});

// 여러가지 에러 처리 미들 웨어
// 입력 오류 등 ...
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  res.status(400).json({ error: err.message });
  // 500 crash dump - 오류 핸들링 했으면 사용자 오류로 -> 400
});

// 서버 실행
app.listen(port, (): void => {
  console.log("서버 레디");
});
