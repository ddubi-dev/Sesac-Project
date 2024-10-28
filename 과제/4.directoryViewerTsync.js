import fs from "fs";
import path from "path";

const directoryPath = "./";

function checkFile(filePath) {
  const stat = fs.statSync(filePath);

  if (stat.isDirectory()) {
    console.log(`${filePath}: 이것은 디렉토리.`);
  } else if (stat.isFile()) {
    console.log(`${filePath}: 이것은 파일.`);
  } else {
    console.log(`${filePath}: 이것은 뭘까요.`);
  }
}

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log("읽기 오류");
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    console.log("파일: ", filePath);
    checkFile(filePath); // 비동기(시키고 난 뒤 나 신경쓰지마. 알아서 할게.) => 동기
  });
});
