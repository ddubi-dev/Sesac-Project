const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const { parse } = require("querystring");

const users = {};

const server = http.createServer((req, res) => {
  // console.log(req.method, req.url);

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

// 포트의 상태를 읽음.
server.listen(3000, () => {
  console.log("서버가 3000번 포트에서 대기중입니다.");
});

// js의 특성: 호이스팅
async function handleGetRequest(req, res) {
  try {
    if (req.url === "/") {
      const data = await fs.readFile("./index.html");
      res.end(data);
    } else if (req.url === "/about") {
      const data = await fs.readFile("./about.html");
      res.end(data);
    } else if (req.url === "/user") {
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      //   console.log(users); -- 메모리 안의 객체 형태(자료구조)이기 때문에 값을 넘길 수 없음
      res.end(JSON.stringify(users)); // 문자 형태로 변환함
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end("알 수 없는 오류"); // 사용자 친화적인 오류 메시지를 전달할 것
  }
  // res.end 2번 쓰면 죽음
}
// try-catch 좁힐수록 좋은 코드

function handlePostRequest(req, res) {
  if (req.url === "/user") {
    let body = "";

    // req.on("data", (data)=>{body+=data;}); - 모던 js 스타일
    req.on("data", (data) => {
      body += data;
    });

    req.on("end", () => {
      // 데이터가 다 쌓였을 때 할 일을 여기에 작성.
      if (req.headers["content-type"] === "text/plain") {
        return res.end("plantext로 데이터를 줬구나");
      } else if (req.headers["content-type"] === "application/json") {
        const parsedData = JSON.parse(body);
        const username = parsedData.name;
        users[username] = username;
        return res.end(`application/json이구나, ${parsedData}`);
      } else {
        res.writeHead(404);
        return res.end("모르는 타입임");
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
  if (req.url === "/") {
    res.end("DELETE요청 / 응답완료");
  } else if (req.url === "/about") {
    res.end("DELETE요청 /about 응답완료");
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
}

// 사용자(브라우저)의 입장 - GET(얻기), POST(넣기), PUT(전체수정/PATCH일부수정), DELETE(삭제)
