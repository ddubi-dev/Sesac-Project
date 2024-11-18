// 라이브러리 추가
require("dotenv").config(); // 불러오면 끝. 굳이 변수 사용X
const express = require("express");
// const sqlite3 = require("sqlite3");
const sqlite3 = require("sqlite3").verbose();
// 이건 개발 환경에서만 사용! 배포시 지워야 함.
const path = require("path");

// 변수 정의
const app = express();
const PORT = 3000;
const db = new sqlite3.Database(process.env.DB_PATH);
// const dbFile = "chinook.db";
// 환경변수 사용 =>
// console.log(process.env);
// console.log("내 환경변수: ", process.env.DB_PATH);

// 미들웨어 추가
app.use(express.static("public"));

// 라우트 정의
app.get("/", (req, res) => {
  // console.log("여기 왔냐?"); // 미들웨어가 있으니 이게 안 뜸
  // 여기는 도달하지 않음... public을 미들웨어로 노출한 경우라.
  res.sendFile(path.resolve("public/index.html"));
});

app.get("/api/search", (req, res) => {
  const { choice, searchQuery, page = 1 } = req.query; //  페이지 기본값 1
  //   const searchQuery = req.query.searchQuery;
  //   const page = req.query.page;
  const itemsPerPage = 10; // 페이지당 열개만 출력
  const offset = (page - 1) * itemsPerPage; // page:1 0~10, page:2 10~20 | offset 어디서부터

  let countSql = "";
  let sql = "";

  if (choice == "artists") {
    countSql = `SELECT COUNT(*) AS count FROM artists WHERE name Like ?`;
    sql = `SELECT * FROM artists WHERE name Like ? LIMIT ? OFFSET ?`; // sql injection에 취약하기 때문에 prepared statement 사용
  } else if (choice == "albums") {
    countSql = `SELECT COUNT(*) AS count FROM albums WHERE Title Like ?`;
    sql = `SELECT * FROM albums WHERE Title Like ? LIMIT ? OFFSET ?`;
  } else if (choice == "tracks") {
    countSql = `SELECT COUNT(*) AS count FROM tracks WHERE name Like ?`;
    sql = `SELECT * FROM tracks WHERE name Like ? LIMIT ? OFFSET ?`;
  } else if (choice == "composer") {
    countSql = `SELECT COUNT(*) AS count FROM tracks WHERE Composer Like ?`;
    sql = `SELECT * FROM tracks WHERE Composer Like ? LIMIT ? OFFSET ?`;
  } else if (choice == "genre") {
    countSql = `SELECT COUNT(*) AS count FROM genres WHERE Name Like ?`;
    sql = `SELECT * FROM genres WHERE Name Like ? LIMIT ? OFFSET ?`;
  } else if (choice == "customer") {
    countSql = `SELECT COUNT(*) AS count FROM customers WHERE LastName||" "||FirstName Like ?`;
    sql = `SELECT LastName||" "||FirstName as Name FROM customers WHERE LastName|""|FirstName Like ? LIMIT ? OFFSET ?`;
  }

  // 사용자가 요청한 내용이 몇개나 있고, 그게 몇 페이지가 될건지 계산하기
  db.get(countSql, [`%${searchQuery}%`], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500);
    }
    const totalPage = Math.ceil(row.count / itemsPerPage); // 무조건 올림
    console.log("검색한 행의 개수: ", row.count, "토탈 페이지: ", totalPage, "offset: ", offset);

    db.all(sql, [`%${searchQuery}%`, itemsPerPage, offset], (err, rows) => {
      // 비동기
      if (err) {
        console.log("여기 에러야");
        // 여기에 에러처리(400,500)
        console.error(err.message);
        res.status(500);
        return;
      }
      console.log("여기 밖이야");
      res.json({ results: rows, currentPage: page, totalPage: totalPage, status: "ok" });
      // res.json();
      // 그냥 다이렉트로 보내도 되고, 형식 정해서 (프론트-백)
    });
  });
});

app.listen(PORT, () => {
  console.log("서버 레디");
});
