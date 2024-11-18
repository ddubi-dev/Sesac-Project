const express = require("express");
const nunjucks = require("nunjucks");
const sqlite3 = require("better-sqlite3"); //.verbose() 없음
const path = require("path");

const app = express();
const PORT = 3000;
const db = new sqlite3("user-sample.db"); // .Database 없음

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

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
  const userId = req.params.id;
  const query = db.prepare("select * from users where Id = ?");
  const data = query.get(userId);
  res.render("user_detail.html", { user: data });
  // 내(서버)가 쿼리&렌더해서 만들어줌
});

app.get("/", (req, res) => {
  const query = db.prepare(`SELECT * FROM users`);
  const data = query.all();

  if (data) {
    res.render("user.html", { data: data });
    // 뷰엔진으로 데이터를 넘김
    // key 를 줘야함
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log("서버 레디");
});
