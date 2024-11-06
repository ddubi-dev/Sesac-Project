const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const { parse } = require("querystring");

const users = {};

// http 모듈이 req 객체(상태포함)로 만들어 전달해줌
const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  if (req.method === "GET") {
    handleGetRequest(req, res);
  } else if (req.method === "POST") {
    handlePostRequest(req, res);
  } else if (req.method === "PUT") {
    handlePutRequest(req, res);
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

// GET
async function handleGetRequest(req, res) {
  try {
    // 좋은 위치 아님
    if (req.url === "/") {
      const data = await fs.readFile("./index.html");
      res.end(data);
      // 1
      // try {
      //   const data = await fs.readFile("./index.html");
      // } catch (err) {}

      // 2
      // readFileAndSendResponse("./index.html"); // 함수 내에서 try-catch를 사용, 리팩토링
    } else if (req.url === "/about") {
      const data = await fs.readFile("./about.html");
      res.end(data);
    } else if (req.url === "/user") {
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(users));
    } else if (req.url.startsWith("/static")) {
      const filePath = path.join(__dirname, req.url);
      // console.log(filePath);
      try {
        const data = await fs.readFile(filePath);
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end("Not Found");
      }
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end("알 수 없는 오류");
  }
}

function handlePostRequest(req, res) {
  if (req.url === "/user") {
    let body = "";

    req.on("data", (data) => {
      body += data;
    });

    req.on("end", () => {
      if (req.headers["content-type"] === "text/plain") {
        return res.end("plantext로 데이터를 줬구나");
      } else if (req.headers["content-type"] === "application/json") {
        const parsedData = JSON.parse(body);
        const username = parsedData.name;
        users[username] = username;
        // console.log(`users: ${JSON.stringify(users)}`);

        return res.end(`application/json이구나, ${JSON.stringify(users)}`);
      } else if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
        res.writeHead(200, { "Content-Type": "application/json; charset:utf-8" });
        return res.end(`form으로 데이터를 잘 받았음.`);
      } else {
        res.writeHead(404);
        return res.end("Not Found");
      }
    });
  } else {
  }
}

function handlePutRequest(req, res) {
  if (req.url === "/") {
    res.end("Put요청 / 응답완료");
  } else if (req.url === "/about") {
    res.end("Put요청 /about 응답완료");
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
}

function handleDeleteRequest(req, res) {
  if (req.url.startsWith("/user/")) {
    const username = path.basename(req.url);
    if (username && users[username]) {
      delete users[username];
      res.writeHead(200, { "Content-Type": "text-plain; charset=utf-8" });
      res.end(`${username} 삭제 성공`);
    } else {
      res.writeHead(404, { "Content-Type": "text-plain; charset=utf-8" });
      res.end(`${username} 사용자를 찾을 수 없습니다.`);
    }
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
}
