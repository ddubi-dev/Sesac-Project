const express = require("express");
const app = express(); // 익스프레스를 가져와 사용, 똑같은데 앞뒤 래핑해준 것
const port = 3000;

// 라이브러리 문법 익히기

// get
app.get("/", (req, res) => {
  res.send("Hello, express");
});

app.get("/user", (req, res) => {
  res.send("<h1>여기는 사용자 페이지입니다.</h1>");
});

app.get("/admin", (req, res) => {
  res.send("<h1>여기는 관리자 페이지입니다.</h1>");
});

// post
app.post("/", (req, res) => {
  res.send("POST 요청이 /에 날라왔음");
});

app.post("/user", (req, res) => {
  res.send("POST 요청이 /user에 날라왔음");
});

app.post("/admin", (req, res) => {
  res.send("POST 요청이 /admin에 날라왔음");
});

// put
app.put("/", (req, res) => {
  res.send("PUT 요청이 /에 날라왔음");
});

//  delete
app.delete("/", (req, res) => {
  res.send("DELETE 요청이 /에 날라왔음");
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
