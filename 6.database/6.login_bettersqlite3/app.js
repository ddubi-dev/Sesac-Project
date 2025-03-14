// 모듈들 불러오기
const express = require("express");
const sqlite3 = require("better-sqlite3");
const path = require("path");

// 내부에서 사용할 변수들 정의
const app = express();
const PORT = 3000;
const db = sqlite3("users.db");

// 미들웨어 등록
app.use(express.urlencoded({ extended: true })); // 기본 폼 입력값 처리

// 라우팅 등록
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(`username: ${username}, password: ${password}`);

  const queryStr = `SELECT * FROM users WHERE username = ? AND password = ?`;
  const row = db.prepare(queryStr, [username, password]).get(username, password);

  if (row) {
    console.log(`사용자 조회:`, row);
    res.send(`로그인 성공: ${row.username}`);
  } else {
    res.send("로그인 실패");
  }
});
app.listen(PORT, () => {
  console.log("서버 레디");
});
