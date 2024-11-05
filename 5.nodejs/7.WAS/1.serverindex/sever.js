const http = require("http");

const server = http.createServer();

// 소켓 커넥션을 처음 맺을 때
server.on("connection", () => {
  console.log("새로운 사용자가 접속합니다.");
});

// 요청이 왔을 때
server.on("request", (req, res) => {
  console.log("요청이 왔습니다: ");
  //   console.log(`req 중에 유용한 정보: `);
  //   console.log(`req.method = ${req.method}`);
  //   console.log(`req.url = ${req.url}`);
  //   console.log(req.headers);
  //   console.log(`req.headers = ${req.headers}`);
  //   console.log(`req.headers = ${JSON.stringify(req.headers)}`);
  //   console.log(`req.headers['user-agent']: ${req.headers["user-agent"]}`);
  //   console.log(`req.headers['content-type']: ${req.headers["content-type"]}`);
  //   console.log(`req.socket.remoteAddress=${req.socket.remoteAddress}`);

  // 헤더(Header)
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  // 본문(Body)
  res.write("<h1>헬로우 노드</h1>");
  res.write("<h2>헬로우 노드</h2>");
  res.end("<p>안녕</p>");

  console.log("나의 응답에 대한 응답 처리완료");

  req.on("close", () => {
    console.log("클라이언트 접속 종료");
  });
});

// 포트 정하기
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

server.on("close", () => {
  console.log("서버가 종료되었습니다.");
});

// 우리 서버를 10초 뒤에 종료 되도록
// const timer = setTimeout(() => {
//   console.log("10초가 지나서 서버를 종료합니다...");
//   server.close();
// }, 10000);

// q를 눌러서 서버 종료
const readline = require("readline"); // X
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("line", (input) => {
  if (input == "q") {
    console.log("q가 눌려 서버를 종료합니다.");
    server.close();
    rl.close();
  }
});

console.log("서버 프로그램이 시작되었습니다");
// 비동기처리로 제일 먼저 출력됨
