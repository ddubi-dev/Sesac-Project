const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = 3000;

// 미들웨어
app.use(cors()); // 모든 거 허용
app.use(
  cors({
    origin: ["http://localhost:3001", "http://127.0.0.1"],
    method: ["GET", "POST"],
  })
);
app.use(morgan("dev"));

// API 라우트
app.get("/", (req, res) => {});

app.listen(PORT, () => {
  console.log("서버 레디 on " + PORT);
});
