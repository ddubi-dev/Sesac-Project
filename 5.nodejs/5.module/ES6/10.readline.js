// const readline = require("readline"); // (Common JS) 오래된 방법
// import readline from "readline"; // (ES6) 새로운 방법

var readline = require("linebyline");
var rl = readline("./example.txt"); // (Common JS) 오래된 방법

rl.on("line", function (line, lineCount, byteCount) {
  console.log(line, lineCount, byteCount);
}).on("error", function (err) {
  console.log("오류 발생", e.message);
});
