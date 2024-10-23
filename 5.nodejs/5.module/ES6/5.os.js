const os = require("os");

const hostname = os.hostname(); // os에 요청하는 것.
console.log("내 pc의 호스트 명은?", hostname);

const tmpDir = os.tmpdir();
console.log("임시 폴더 경로는??", tmpDir);

const freemem = os.freemem();
console.log("잔여 메모리는?? ", freemem);

console.log("CPU는?? ", os.cpus());
