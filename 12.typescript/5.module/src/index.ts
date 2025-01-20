// CommonJS 스타일 - 과거 브라우저 스타일
// const  = require("");

// TS - ESModule, 모던스타일 - type:"module"
import { add, sub } from "./math";
import { toUpperCase, toLowerCase } from "./string";

console.log(`Add: ${add(10, 5)}`);
console.log(`Sub ${sub(10, 5)}`);

console.log(`Upper: ${toUpperCase("HeLLooooo")}`);
console.log(`Lower: ${toLowerCase("HELLooooo")}`);
