// 메인 파일은 보통 index.js 또는 app.js

// 외부 모듈을 불러온다
const { addNumbers, subNumbers } = require("./ES6/add");
// const subFunction = require("./add");

const result = addNumbers(5, 3);
console.log(result);

const result2 = subNumbers(5, 3);
console.log(result2);
