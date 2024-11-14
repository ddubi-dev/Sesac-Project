// 모듈들 불러오기
const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const sqlite3 = require("sqlite3");
const path = require("path");

// 내부에서 사용할 변수들 정의
const app = express();
const PORT = 3000;
const db = new sqlite3.Database("users.db"); // 꼭 DB가 분리될 필요는 없다

// 세션 초기화
app.use(
  session({
    secret: "my-secret-1234",
    resave: false,
    saveUninitialized: true,
    store: new SQLiteStore({ db: "sessions.db" }), // 세션 정보를 db에 저장하겠다.
    // 항상 DB를 물고 옴(???) - SID 가 session에 있다면 로그인이 유지. ---????
  })
);

// 미들웨어 등록
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// 라우팅 등록
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.get("/profile", (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, "public", "profile.html"));
  } else {
    res.redirect("/");
  }
});

app.get("/profile-data", (req, res) => {
  const user = req.session.user;

  if (user) {
    db.get(`SELECT * FROM users WHERE id = ?`, [user.id], (err, row) => {
      if (row) {
        res.json(row);
      }
    });
  } else {
    res.status(404).json({ error: "사용자 없다" });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(`username: ${username}, password: ${password}`);

  const queryStr = `SELECT * FROM users WHERE username = ? AND password = ?`;

  db.get(queryStr, [username, password], (err, row) => {
    if (row) {
      console.log(`사용자 조회:`, row);
      req.session.user = row;
      res.redirect("/profile");
    } else {
      res.send("로그인 실패");
    }
  });
});

app.get("/logout", (req, res) => {
  // 에러처리필요
  req.session.destroy();
  console.log("로그아웃 완료");
  res.send();
});

app.listen(PORT, () => {
  console.log("서버 레디");
});
