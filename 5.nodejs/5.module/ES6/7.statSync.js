const fs = require("fs");

const directoryPath = "./";

fs.readdir(directoryPath, (error, files) => {
  if (error) {
    console.log("디렉토리 읽기 오류");
    return;
  }
  files.forEach((file) => {
    try {
      const data = fs.statSync(file); // 순서를 보장함
      if (data.isDirectory()) {
        console.log(`이 파일 ${file}은 디렉토리 입니다.`);
      }
      if (data.isFile()) {
        console.log(`이 파일 ${file}은 파일 입니다.`);
      }
    } catch (err) {
      console.log("에러가 발생하였습니다", err.message);
    }
  });
});
