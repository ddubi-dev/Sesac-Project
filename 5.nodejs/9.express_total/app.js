// 새로운 폴더니 익스프레스 설치

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

// 라우트
app.get("/", (req, res) => {
  const filePath = path.resolve(__dirname, "index.html");
  res.sendFile(filePath);
});

app.get("/about", (req, res) => {
  //join??
  res.sendFile(path.resolve(__dirname, "about.html"));
});

app.get("/user", (req, res) => {
  res.json(users); //json 형태로 req.body에 들어감
});

app.post("/user", (req, res) => {
  // const name = req.body.name;
  const { name } = req.body;
  users[name] = name;
  res.status(201).send("등록 성공"); // 201은 created
});

app.put("/user", (req, res) => {
  res.send("이제 짜야함...");
});
// 수정, id를 받아와야함

app.delete("/user", (res, req) => {
  res.send("이제 짜야함");
});
// 삭제, id를 받아와야함

// 오류미들웨어

//서버 시작
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}에서 대기 중입니다.`);
});
