const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const users = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 35 },
];

// 각종 미들웨어 셋업
// app.use(cors()); // 모든 거 다 허용할거야(보안 최악)
app.use(cors({ origin: ["http://localhost:3001", "http://127.0.0.1:3001"], method: ["GET", "POST"] })); // 여기랑만 통신할거야
app.use(morgan("dev")); // 기본 개발자 디버깅

// API 라우트 셋업
app.get("/api/users", (req, res) => {
  // 반납하는 데이터 줄인다
  const summary = users.map((u) => ({ id: u.id, name: u.name }));
  // DB 가 커졌으니, /api/users 전체를 요청할 때는, 이 많은 것 중에 id,
  res.json(summary);
});

app.get("/api/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  // 디버깅, 없는 사용자
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  // console.log(user);

  res.json(user);
});

app.listen(3000, () => {
  console.log("서버 레디");
});
