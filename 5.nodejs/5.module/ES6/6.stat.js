const fs = require("fs");

const directoryPath = "./";

fs.readdir(directoryPath, (error, files) => {
  if (error) {
    console.log("디렉토리 읽기 오류");
    return;
  }
  files.forEach((file) => {
    fs.stat(file, (err, stat) => {
      // 순서가 보장이 안될 수도 있음
      if (err) {
        console.log("파일 읽기 오류");
        return;
      }
      if (stat.isDirectory()) {
        console.log(`이 파일 ${file}은 디렉토리 입니다.`);
      }
      if (stat.isFile()) {
        console.log(`이 파일 ${file}은 파일 입니다.`);
      }
    });
  });
});

// 현재 비동기 처리 함수 -> 동기(순차적) 처리 함수로 바꾸기
// 실제 코딩, 웹은
