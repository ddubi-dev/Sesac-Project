const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 비동기는 모두 callback 함수를 받는다
// eventEmitter (이벤트 처리 관련)

// ----------------------------------------------------------------------

// console.log("입력값 받기 전");

function askQ(query) {
  return new Promise((resolve, reject) => {
    rl.question(query, (answer) => {
      console.log("입력한 값은 ", answer);
      resolve(answer);
      rl.close();
    });
  });
}

// askQ("원하는 값을 입력하세요: ").then((answer) => {
//   console.log("answer: ", answer);
//   return askQ("원하는 값 2을 입력하세요: ");
// });

// ----------------------------------------------------------------------

// 콜백함수 - callback hell
// promise 객체 - callback hell, (resolve()/reject()).then/.catch
// async/await

// (async) 내 안에 비동기 있다 선언
async function askQs() {
  const answer1 = await askQ("원하는 값1을 입력하세요: ");
  console.log(`입력한 값은 ${answer1}`);
  const answer2 = await askQ("원하는 값2을 입력하세요: ");
  console.log(`입력한 값은 ${answer2}`);
}

askQs();
