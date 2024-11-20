const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");
const morgan = require("morgan");
const fs = require("fs");

//.env
const app = express();
const PORT = 3000;
const db = new sqlite3.Database("user-sample.db");

const logStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

// 미들웨어
app.use(express.static("public"));
app.use(morgan("combined", { stream: logStream }));
// app.use(morgan("dev"));
app.use(
  morgan("dev", {
    skip: (req, res) => res.statusCode < 20 || res.statusCode >= 300, // 200번대의 로그만
  })
);
// combined - 아파치 서버 로그 포맷
// common - 요약된 형태
// dev - 개발 시 유용한 코드
// tiny, short

// app.use(myLogger);
function myLogger(req, res, next) {
  console.log(`LOG: ${req.method} ${req.url}`);
  next();
}

// 라우트
// 시스템 호출용 API 라우트
app.get("/api/users", (req, res) => {
  // console.log("/api/users 호출됨");
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
  // console.log("/api/users/:id 호출됨");

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
  console.log(`Server is ready on http://localhost:${PORT}`);
});
