const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const user = {};

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    handleGetRequest(req, res);
  } else if (req.method === "POST") {
    handlePostRequest(req, res);
  } else if (req.method === "PATCH") {
    handlePatchRequest(req, res);
  } else if (req.method === "DELETE") {
    handleDeleteRequest(req, res);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("서버가 3000번 포트에서 대기중입니다.");
});

async function handleGetRequest(req, res) {
  console.log(req.url);
  try {
    if (req.url === "/") {
      // 기본 화면 요청
      const data = await fs.readFile("./html/index.html");
      res.end(data); // 프론트로 전달
    } else if (req.url === "/about") {
      // about 화면 요청
      const data = await fs.readFile("./html/about.html");
      res.end(data);
    } else if (req.url === "/user") {
      // user 데이터 요청
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(user));
    } else if (req.url === "/static/cat1.jpg") {
      const imgName = path.basename(req.url);
      const imgPath = path.join("static", imgName);
      const imgData = await fs.readFile(imgPath);
      res.writeHead(200, { "Content-Type": "image/jpg; charset:utf-8" });
      res.end(imgData);
    } else if (req.url === "/static/user.js") {
      const fileName = path.basename(req.url);
      const filePath = path.join("static", fileName);
      const fileData = await fs.readFile(filePath);
      res.writeHead(200);
      res.end(fileData);

      console.log(path.basename(req.url));
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  } catch (error) {
    console.error("서버 오류", error);
    res.writeHead(500);
    res.end("알 수 없는 오류 발생");
  }
}
function handlePostRequest(req, res) {
  // 서버는 데이터 받음&저장
  try {
    if (req.url === "/user") {
      let body = "";
      req.on("data", (data) => {
        body += data;
      });
      req.on("end", () => {
        console.log(`1. body: ${body}`);
        user[body] = body;
        console.log(`2. user: ${JSON.stringify(user)}`);
      });
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end("");
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  } catch (error) {
    console.error("서버 오류", error);
    res.writeHead(500);
    res.end("알 수 없는 오류 발생");
  }
}
function handlePatchRequest(req, res) {}
function handleDeleteRequest(req, res) {}
