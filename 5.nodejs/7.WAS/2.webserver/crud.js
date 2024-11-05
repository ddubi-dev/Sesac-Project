const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  res.end("처리 완료");
});
