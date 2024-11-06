// 비동기, 콜백함수

const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const port = 3000;

app.use(express.static("public"));
app.get("/", (req, res) => {
  const htmlFileData = path.join(__dirname, "public", "index.html");

  fs.readFile(htmlFileData, (err, data) => {
    if (err) {
      res.status(500).send("서버 오류");
      return;
    }
    res.setHeader("Content-Type", "image/jpeg"); // MIME 타입 설정
    res.send(data);
  });
});

app.get("/sendFile", (req, res) => {
  const htmlFile = path.join(__dirname, "public", "index.html");
  // res.sendFile(htmlFile);

  res.sendFile(htmlFile, (err) => {
    // 에러 커스터마이징
    if (err) {
      res.status(500).send("서버 오류");
    }
  });
});

//
app.use((req, res) => {
  res.status(404).send("없음");
});

app.use((err, req, res, next) => {
  res.status(500).send("서버 오류");
  // res.status(500).json({ message: "서버 내부 오류" });
});

app.listen(port, () => {
  console.log("서버 오픈");
});
