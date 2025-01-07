const express = require("express");
const path = require("path");
const cors = require("cors"); //사용자 정보가 빠져나가는 걸 방지하기 위한 웹 브라우저의 보안기능.

const app = express();
const port = 3000;

app.use(cors()); // 모든 origin 다 허용

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "news.html"));
});

const newsArticles = [`“엄마, 안녕”... 러·우크라 백병전 영상에 담긴 한 군인의 마지막`, `코로나 걸리면 학습능력이 떨어진다고?… 美 여학생 성적 '수십년 만에 최저'`, `'오징어 게임2' 대사에 분노한 베트남… “보이콧하자”`];

// SSE 엔드포인트
app.get("/news", (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Content-Type", "text/event-stream");

  const sendRandomNews = () => {
    const randomIndex = Math.floor(Math.random() * newsArticles.length);
    const news = newsArticles[randomIndex];
    res.write(`data: ${JSON.stringify({ news })}\n\n`);
  };

  // 2~5초 사이의 주기적으로 전송
  // server sent event, 비주기적인 이벤트 리슨하고 있겠다.
  const interval = setInterval(() => {
    sendRandomNews();
  }, Math.floor(Math.random() * 3000) + 2000); // 2~5초

  req.on("close", () => {
    clearInterval(interval);
    console.log("사용자가 도망감");
    // 버그
  });
});

const server = app.listen(port, () => {
  console.log("서버 레디");
});
