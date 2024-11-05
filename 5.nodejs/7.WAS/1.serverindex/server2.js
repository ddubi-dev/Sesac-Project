const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<p>헬로우 어게인</p>");
  })
  .listen(3000, () => {
    console.log("서버 대기중.. on 3000");
  });

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<p>헬로우 어게인</p>");
  })
  .listen(4000, () => {
    console.log("서버 대기중.. on 4000");
  });

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<p>헬로우 어게인</p>");
  })
  .listen(5000, () => {
    console.log("서버 대기중.. on 5000");
  });
