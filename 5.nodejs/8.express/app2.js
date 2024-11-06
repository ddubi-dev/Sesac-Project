const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(`결과를 출력한다`);
});

app.get("/users", (req, res) => {
  res.send(`사용자를 출력한다`);
});

app.get("/users/:id", (req, res) => {
  console.log(req.params); // 받은 값을 params에 넣음
  res.send(`사용자 ${req.params.id}를 출력한다`);
});
// curl -X GET localhost:3000/users/12122312

// app.get("/user/:name", (req, res) => {
//   console.log(req.params);
//   res.send(`사용자 ${req.params.name}를 출력한다`);
// });

app.get("/users/:id/profile", (req, res) => {
  console.log(req.params);
  res.send(`사용자 ${req.params.id}에 대한 상세한 profile을 출력한다`);
});
// curl -X GET localhost:3000/users/2/profile

app.get("/search", (req, res) => {
  const queryParams = req.query;
  console.log(queryParams);
  // res.send("여기는 검색 결과가 출력되는 곳");
  res.send(`검색을 요청한 내용은 ${queryParams.q}와 최근 ${queryParams.top} 갯수입니다.`);
});
// curl "localhost:3000/search?q=samsung&top=10"
// utf-8
// 어떤 쿼리로 보내는 지 프론트와 백이 사전협의

app.listen(port, () => {
  console.log("서버 레디");
});
