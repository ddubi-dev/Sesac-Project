// npm i express
// npm i ejs -- express에 추가하는 느낌, 플러그인 느낌

const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

// 익스프레스의 뷰엔진으로 ejs를 쓸거다
// '뷰 엔진으로 ejs를 쓸거야' 명시
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// <%= 변수명 %>
// <%# 주석 %>
// <% 로직 %>

app.get("/", (req, res) => {
  // res.sendFile("index.html");
  // 파일을 주는 게 아니라 렌더링해서 넘김

  //   res.render("index.html");
  res.render("index", { title: "익스프레스웹", message: "웰컴투 EJS" });
  // views 폴더의 .ejs 파일: 정해져 있는 것
});

app.get("/", (req, res) => {
  const fruits = ["apple", "banana", "orange", "graphs"];
  res.render("fruits", { fruits: fruits });
});

app.get("/greeting", (req, res) => {
  const username = "soohyun"; // 실제로는 이건 DB에서 가져오는 로직이 있을거고
  res.render("greeting", { username: username });
});

app.get("/welcome", (req, res) => {
  const isAdmin = false; // 나중에는 실제 사용자 권한으로 ..
  //   res.render("welcome", { isAdmin: isAdmin });
  res.render("welcome", { isAdmin }); // 축약
});

app.listen(PORT, () => {
  console.log(`서버 레디`);
});
