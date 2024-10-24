const path = require("path");

const filePath = path.join("C:/MyFolder/Sesac", "file1.txt");
// 알아서 환경에 맞는 주소체계로 바꾸어줌 - 일반 문자열과의 차이
console.log("파일 경로 : ", filePath);

const extName = path.extname(filePath);
console.log("파일의 확장자 : ", extName);

const dirName = path.dirname(filePath);
console.log("디렉토리명 : ", dirName);

const fileName = path.basename(filePath);
console.log("파일명 : ", fileName);
