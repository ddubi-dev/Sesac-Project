require("dotenv").config();
const express = require("express");
const nunjucks = require("nunjucks");
const sqlite3 = require("better-sqlite3"); //.verbose() 없음
const path = require("path");
const morgan = require("morgan");
const debug = require("debug");

const app = express();
const PORT = 3000;
const db = new sqlite3("user-sample.db"); // .Database 없음
const isDebugMode = process.env.DEBUG === "true";
const debugS = new debug("myapp:server");
const debugR = new debug("myapp:request");
const debugDEV = new debug("myapp:DEV");
const debugERR = new debug("myapp:ERR");

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// 미들웨어
app.use(express.static("public"));
// if (isDebugMode) {
//   console.log("Running on development mode. Debugging is enabled.");
//   app.use(morgan("dev"));
// } else {
//   console.log("Running on production mode. Debugging is enabled.");
//   app.use(morgan("combined"));
// }

if (isDebugMode) {
  debugS("Running on development mode. Debugging is enabled.");
  app.use(morgan("dev"));
} else {
  debugS("Running on production mode. Debugging is enabled.");
  app.use(morgan("combined"));
}

app.get("/error", (req, res) => {
  const error = new Error("This is a test error");
  if (isDebugMode) {
    console.error(`[DEBUG ERROR] ${error}`);
    res.send(500).send(`Internal Error: ${error.stack}`);
  } else {
    res.status(500).send("Internal Error");
  }
});

// 사용자 페이지용 API 라우트
app.get("/user/:id", (req, res) => {
  debugR("내가 쓰고 싶음 메세지 - 사용자 디테일");
  // set DEBUG=myapp:server,myapp:request&&node app.js
  const userId = req.params.id;
  const query = db.prepare("select * from users where Id = ?");
  const data = query.get(userId);
  res.render("user_detail.html", { user: data });
  // 내(서버)가 쿼리&렌더해서 만들어줌
});

app.get("/", (req, res) => {
  debugR("???");

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
