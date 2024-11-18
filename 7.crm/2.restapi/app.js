const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");

//.env
const app = express();
const PORT = 3000;
const db = new sqlite3.Database("user-sample.db");

// 미들웨어
app.use(express.static("public"));

// 라우트
// 시스템 호출용 API 라우트
app.get("/api/users", (req, res) => {
  const query = `SELECT * FROM users`;
  db.all(query, (err, rows) => {
    if (err) {
      // 에러 처리
    } else {
      res.json(rows);
    }
  });
});

app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM users WHERE id = ?`;

  if (userId) {
    db.get(query, userId, (err, row) => {
      if (!row) {
        // 에러 처리
        res.status(404).json({ error: "사용자가 없습니다." });
      } else {
        res.json(row);
      }
    });
  }
});

// 사용자 페이지용 API 라우트
app.get("/user/:id", (req, res) => {
  res.sendFile(path.resolve("public/user_detail.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/users.html"));
  //   res.sendFile(path.join(__dirname, "public", "users.html"));
});

// 서버 시작
app.listen(PORT, () => {
  console.log("서버 레디");
});
