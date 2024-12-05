const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = 3000;

// 서버 데이터
const users = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 35 },
];

// 미들웨어
// app.use(cors()); // 모든 거 허용
app.use(
  cors({
    origin: ["http://localhost:3001", "http://127.0.0.1"],
    method: ["GET", "POST"],
  })
);
app.use(morgan("dev"));

// API 라우트
app.get("/api/users", (req, res) => {
  // res.json(users); // 전체 데이터 전송
  const summary = users.map((u) => ({ id: u.id, name: u.name }));
  res.json(summary);
});

app.get("/api/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});
app.listen(PORT, () => {
  console.log("서버 레디 on " + PORT);
});
