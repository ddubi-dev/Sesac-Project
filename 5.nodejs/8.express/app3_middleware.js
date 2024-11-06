const express = require("express");
const app = express();
const port = 3000;

function myLogger(req, _, next) {
  // 미들웨어는 세 개의 인자를 받음. 요청, 응답, 나의 다음 포인트(callback함수가 옴) (보안 - 인증 등에 많이 사용)
  //  모든 미들웨어가 제대로 끝나려면 next() 필수
  //   console.log("보안 검사중");
  console.log(`LOG: ${req.method}, ${req.url}`);
  next();
}

function mySecurity(req, _, next) {
  console.log("나의 2번째 함수");
  console.log(`1. 요청시간: ${req.requestedTime}`);
  req.requestedTime = Date.now();
  console.log(`2. 요청시간: ${req.requestedTime}`);
  next();
}

function myAuth(_, _, next) {
  console.log("나의 3번째 함수");
  next();
}

//미들웨어 등록하는 곳
app.use(myLogger);
app.use(mySecurity);
app.use(myAuth);
app.use((req, res, next) => {
  console.log("나의 4번째 함수");
  next();
});

app.get("/", (req, res) => {
  // res.end("hello");
  //   res.send("hello");
  const timeString = new Date(req.requestedTime).toString();
  res.send(`헬로우를 요청한 시간은 ${timeString}`);
});

app.listen(port, () => {
  console.log("server ready");
});
