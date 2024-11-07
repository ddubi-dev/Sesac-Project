// 외부 모듈 import
const express = require("express");
const path = require("path");

// 변수 정의
const app = express();
const PORT = 3000;
const users = {};

// 미들웨어
// app.use(express.static("static")); // static 폴더를 static으로 만들어줌. 파일은 인지함.
app.use("/static", express.static("static")); // 이렇게 접근할 때 우리의 폴더 내용을 보여줘
app.use("/image", express.static("static/image")); // 이미지 오면 static에서 가져가

app.use(express.json());
app.use(express.text()); // 콘텐트타입이 text/plain일 경우 텍스트 데이터를 파싱할 수 있도록

// 라우트
// GET
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "static", "index.html");
  res.sendFile(filePath);
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "about.html")); //join??
});

app.get("/user", (req, res) => {
  res.json(users); //json 형태로 req.body에 들어감
});

// POST
app.post("/user", (req, res) => {
  // const name = req.body.name;
  const { name } = req.body;
  users[name] = name;
  res.status(201).send("등록 성공"); // 201은 created
});

// PUT
app.put("/user/:id", (req, res) => {
  const userId = req.params.id;
  // 텍스트로 온 거 -> 미들웨어 처리. 안하면 값 없음.
  // console.log(`body: ${req.body}`);

  if (userId in users) {
    users[userId] = req.body;
    res.status(200).send("수정 성공");
  } else {
    // 에러 처리
    // 해당 사용자 없음
    res.status(400).send("수정 실패");
  }
});

// DELETE
app.delete("/user/:id", (req, res) => {
  const userId = req.params.id;
  if (userId in users) {
    delete users[userId];
    res.status(200).send("삭제 성공");
  } else {
    // 에러 처리
    // 해당 사용자 없음
  }
});

// 오류미들웨어
app.use((req, res) => {
  const errorPage = path.join(__dirname, "static", "error.html");
  res.status(404).sendFile(errorPage);
});

//서버 시작
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}에서 대기 중입니다.`);
});
