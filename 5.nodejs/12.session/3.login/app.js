const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 3000;

// 로그인 창 만들기

// 로그인 유지
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

const users = [
  { id: 1, username: "user1", password: "pass1" },
  { id: 2, username: "user2", password: "pass2" },
];

app.post("/login", (req, res) => {
  // 로그인 코드 개발
  const { username, password } = req.body; // 미들웨어로 파서 추가해야함

  // 사용자가 입력한 id/pw를 위의 users 자료구조에서 검색..
  const user = "검색 구현";

  if (user) {
    res.json({ message: "로그인 성공" }); // 명시 안하면 기본 값은 200
  } else {
    res.status(401).json({ message: "로그인 실패" });
  }
});

app.get("/profile", (req, res) => {
  const user = "세션에서 사용자 정보 가져온다";

  if (user) {
    res.json({ username: user.username, message: "프로필 정보" });
  } else {
    res.status(401).json({ message: "인증되지 않은 사용자임" });
  }
});

// 로그아웃은 어떻게???
app.get("/logout", (req, res) => {
  // 세션에서 사용자 정보를 삭제. 어떻게???? 찾아보기~
});

app.listen(port, () => {
  console.log("서버 레디");
});
