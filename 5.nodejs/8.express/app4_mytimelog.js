const express = require("express");
const app = express();
const port = 3000;

function requestTime(req, res, next) {
  req.requestedTime = Date.now();
  console.log(`req.requestedTime: ${req.requestedTime}`);
  next();
}

function myLogger(req, _, next) {
  const formattedTime = new Date(req.requestedTime).toLocaleString();
  console.log(`LOG: ${formattedTime} -${req.method} ${req.url}`);
  next();
}

app.use(requestTime);
app.use(myLogger);

app.get("/", (req, res) => {
  const timeString = new Date(req.requestedTime).toString();
  res.send(`헬로우를 요청한 시간은 ${timeString}`);
});

function middle1(req, res, next) {
  console.log("테스트1");
  next();
}

function middle2() {
  console.log("테스트2");
  next();
}

// about에만 추가 미들웨어
app.get("/about", middle1, middle2, (req, res) => {
  res.send("about 페이지입니다.");
});

app.get("/error", (req, res) => {
  throw new Error("강제로 에러 유발");
});

// 에러 처리용 미들웨어 추가 - 전체 중에 가장 마지막에 주가해야함
app.use((err, req, res, next) => {
  console.error("에러 발생", err);
  res.status(500).json({ message: "서버 내부 오류" });
});

app.listen(port, () => {
  console.log("server ready");
});
