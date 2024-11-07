// express
// nunjucks

const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

// app.set("view engine", "njk"); // 기본 확장자 설정
app.set("view engine", "html");

// nunjucks.configure("views");
nunjucks.configure("views", {
  autoescape: true, // 입력값 처리할 대 XSS 같은 것이 발생하지 않도록 처리하는 기능
  express: app,
});

app.get("/", (req, res) => {
  //   res.render("index", { title: "익스프레스웹", message: "웰컴투 Nunjucks" });
  res.render("index", { title: "익스프레스웹", message: "웰컴투 Nunjucks" }); // 확장자가 바뀐다고 문법이 달라지진 않음.
});

app.get("/greeting", (req, res) => {
  const username = "soohyun";
  res.render("greeting", { username: username });
});

app.get("/welcome", (req, res) => {
  const isAdmin = false;
  res.render("welcome", { isAdmin });
});

app.listen(3000, () => {
  console.log("서버 레디");
});
