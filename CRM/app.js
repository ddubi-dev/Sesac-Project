// 라이브러리
require("dotenv").config(); //.env 파일 불러옴.
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// 변수
const db = new sqlite3.Database(process.env.DB_PATH);
const app = express();
const PORT = 3000;

// 미들웨어
app.use(express.static("public"));
app.use(myLogger);

function myLogger(req, res, next) {
  console.log(`LOG: ${req.method} ${req.url}`);
  next();
}

// 라우트
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "user.html"));
});

app.get("/api/users", (req, res) => {
  // pagination
  const { name, page = 1 } = req.query;
  const itemsPerPage = 20;
  const offset = (page - 1) * itemsPerPage; // 0:0~19, 1:20~39, ...
  let countSql = 0;
  const queryParams = [];

  if (name) {
    countSql = `SELECT COUNT(*) AS count  FROM users WHERE name = ?`;
    queryParams.push(name);
  } else {
    countSql = `SELECT COUNT(*) AS count  FROM users`;
  }

  // 동기화 처리
  db.get(countSql, (err, row) => {
    if (err) {
      // 에러 처리
      res.status(500).json({ message: err.message });
      return;
    } else if (row.count == 0) {
      res.status(404).json({ message: "사용자 정보가 없습니다." });
      return;
    } else {
      const totalPage = Math.ceil(row.count / itemsPerPage);

      const selectQuery = `SELECT * FROM users Limit ? OFFSET ?`;

      db.all(selectQuery, [itemsPerPage, offset], (err, rows) => {
        if (err) {
          console.error(err.message);
          res.status(500);
          return;
        } else {
          res.json({ result: rows, currentPage: page, totalPage: totalPage, status: "ok" });
        }
      });
    }
  });
});

app.get("/api/users/:name", (req, res) => {
  // 검색시 pagination
  const { choice, searchQuery, page = 1 } = req.query;

  const name = req.params.name;
  let selectQuery = `SELECT * FROM users WHERE 1=1 `;
  const queryParams = [];

  if (name) {
    selectQuery += `AND name = ?`;
    queryParams.push = [name];
  }
  console.log("1. 여기까진 옴");

  db.all(selectQuery, queryParams, (err, rows) => {
    console.log("2. 여기까진 옴");
    if (!rows) {
      console.log("rows 없음");
      res.status(404);
      // res.status(404).json({ error: `해당 이름(${name})을 사용자가 없습니다.` });
    } else {
      res.json(rows);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is on http://localhost:${PORT} `);
});
