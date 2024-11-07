const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

app.set("view engine", "html");

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", (req, res) => {
  const data = {
    title: "my page",
    content: "this is my content page",
  };
  res.render("main", data);
  // 이 페이지 렌더링 시 위 데이터 넣고 렌더링
});

app.get("/user", (req, res) => {
  const data = {
    title: "사용자 page",
    content: "this is 사용자 content page",
  };
  res.render("user", data);
});

app.get("/product", (req, res) => {
  const data = {
    title: "상품 page",
    content: "this is 상품 content page",
  };
  res.render("product", data);
});

app.get("/page1", (req, res) => {
  const data = {
    title: "상속하는 스타일",
    content: "this is 상속받은 page1의 content page",
  };
  res.render("page1", data);
});

app.get("/page2", (req, res) => {
  const data = {
    title: "상속하는 스타일",
    content: "this is 상속받은 page2의 content page",
  };
  res.render("page1", data);
});

app.listen(3000, () => {
  console.log("서버 레디");
});
